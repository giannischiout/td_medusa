import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { Modules } from "@medusajs/framework/utils";
import { createProductsWorkflow } from "@medusajs/medusa/core-flows";
import { z } from "zod";
import { PRODUCT_SCHEDULE_MODULE } from "../../../modules/product-scheduler";
import ProductScheduleModuleService from "../../../modules/product-scheduler/service";
import { createProductExtensionFromProductWorkflow } from "../../../workflows/create-product-extension-from-product";

const CreateProductWithExtensionSchema = z.object({
	title: z.string(),
	description: z.string().optional(),
	status: z.enum(["draft", "proposed", "published", "rejected"]).optional(),
	images: z.array(z.any()).optional(),
	options: z.array(z.any()).optional(), // Required by Medusa workflow but auto-added if missing
	variants: z.array(z.any()).optional(),
	category_id: z.string().optional(),
	additional_data: z
		.object({
			duration: z.string().optional(),
			difficulty_level: z.string().optional(),
			max_participants: z.number().optional(),
			location: z.string().optional(),
			tags: z.string().optional(),
		})
		.optional(),
});

export async function POST(req: MedusaRequest, res: MedusaResponse) {
	const body = CreateProductWithExtensionSchema.parse(req.body);
	const { additional_data, category_id, ...productData } = body;

	// If no options provided, create a simple product without options
	// Note: Medusa workflow requires options to create variants, so we add a minimal default
	if (!productData.options || productData.options.length === 0) {
		productData.options = [
			{
				title: "default",
				values: ["default"],
			},
		];
	}

	// Create the product with category if provided
	const productPayload = productData as any;
	if (category_id) {
		productPayload.category_ids = [category_id];
	}

	const { result: createResult } = await createProductsWorkflow(req.scope).run({
		input: {
			products: [productPayload],
		},
	});

	const product = createResult[0];

	// Create product extension if additional_data is provided
	if (additional_data && Object.keys(additional_data).length > 0) {
		await createProductExtensionFromProductWorkflow(req.scope).run({
			input: {
				product,
				additional_data,
			},
		});
	}

	res.json({ product });
}

export async function GET(req: MedusaRequest, res: MedusaResponse) {
	const productModuleService = req.scope.resolve(Modules.PRODUCT);
	const productScheduleService: ProductScheduleModuleService = req.scope.resolve(PRODUCT_SCHEDULE_MODULE);

	// Fetch all products with expanded relations
	const products = await productModuleService.listProducts(
		{},
		{
			relations: ["category"],
		}
	);

	// Fetch all product extensions
	const extensions = await productScheduleService.listProductExtensions();

	// Create a map of product_id -> extension for quick lookup
	const extensionMap = new Map();
	extensions.forEach((ext) => {
		extensionMap.set(ext.product_id, ext);
	});

	// Attach extension data to each product and filter out unnecessary properties
	const productsWithExtensions = products.map((product: any) => {
		const {
			weight,
			length,
			height,
			width,
			origin_country,
			hs_code,
			mid_code,
			material,
			discountable,
			external_id,
			subtitle,
			collection,
			...filteredProduct
		} = product;

		return {
			...filteredProduct,
			productExtension: extensionMap.get(product.id) || null,
		};
	});

	res.json({ products: productsWithExtensions });
}
