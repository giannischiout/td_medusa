import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { PRODUCT_SCHEDULE_MODULE } from "../../../modules/product-scheduler";
import ProductScheduleModuleService from "../../../modules/product-scheduler/service";

type CreateProductExtensionStepInput = {
	product_id: string;
	duration?: string;
	difficulty_level?: string;
	max_participants?: number;
	location?: string;
	tags?: string;
};

export const createProductExtensionStep = createStep(
	"create-product-extension",
	async (data: CreateProductExtensionStepInput, { container }) => {
		if (!data.duration && !data.difficulty_level && !data.max_participants && !data.location && !data.tags) {
			return;
		}

		const productScheduleModuleService: ProductScheduleModuleService = container.resolve(PRODUCT_SCHEDULE_MODULE);

		const productExtension = await productScheduleModuleService.createProductExtensions(data);

		return new StepResponse(productExtension, productExtension);
	},
	async (productExtension, { container }) => {
		if (!productExtension) return;

		const productScheduleModuleService: ProductScheduleModuleService = container.resolve(PRODUCT_SCHEDULE_MODULE);
		await productScheduleModuleService.deleteProductExtensions(productExtension.id);
	}
);
