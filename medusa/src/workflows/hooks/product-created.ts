import { createProductsWorkflow } from "@medusajs/medusa/core-flows";
import {
    CreateProductExtensionFromProductWorkflowInput,
    createProductExtensionFromProductWorkflow,
} from "../create-product-extension-from-product";

createProductsWorkflow.hooks.productsCreated(async ({ products, additional_data }, { container }) => {
	const workflow = createProductExtensionFromProductWorkflow(container);

	for (const product of products) {
		await workflow.run({
			input: {
				product,
				additional_data,
			} as CreateProductExtensionFromProductWorkflowInput,
		});
	}
});
