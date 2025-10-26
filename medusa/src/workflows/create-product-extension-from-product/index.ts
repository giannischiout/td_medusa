import { createWorkflow, WorkflowResponse } from "@medusajs/framework/workflows-sdk";
import { ProductDTO } from "@medusajs/types";
import { createProductExtensionStep } from "./steps/create-product-extension";

export type CreateProductExtensionFromProductWorkflowInput = {
	product: ProductDTO;
	additional_data?: {
		duration?: string;
		difficulty_level?: string;
		max_participants?: number;
		location?: string;
		tags?: string;
	};
};

export const createProductExtensionFromProductWorkflow = createWorkflow(
	"create-product-extension-from-product",
	(input: CreateProductExtensionFromProductWorkflowInput) => {
		const productExtension = createProductExtensionStep({
			product_id: input.product.id,
			duration: input.additional_data?.duration,
			difficulty_level: input.additional_data?.difficulty_level,
			max_participants: input.additional_data?.max_participants,
			location: input.additional_data?.location,
			tags: input.additional_data?.tags,
		});

		return new WorkflowResponse({ productExtension });
	}
);
