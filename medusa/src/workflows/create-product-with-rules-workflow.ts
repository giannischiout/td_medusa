import { StepResponse, WorkflowResponse, createStep, createWorkflow } from "@medusajs/framework/workflows-sdk";
import { createProductsWorkflow } from "@medusajs/medusa/core-flows";
import { PRODUCT_SCHEDULE_MODULE } from "../modules/product-scheduler";
import ProductScheduleModuleService from "../modules/product-scheduler/service";

type CreateProductWithRulesInput = {
	product: {
		title: string;
		description?: string;
		status?: string;
		// Add other product fields as needed
	};
	rules: Array<{
		title: string;
		time_slots?: Array<{
			start_time: string;
			end_time: string;
			capacity: number;
		}>;
	}>;
};

// Step 1: Create the product
const createProductStep = createStep(
	"create-product",
	async (input: CreateProductWithRulesInput, { container }) => {
		const { result: products } = await createProductsWorkflow(container).run({
			input: {
				products: [input.product],
			},
		});

		return new StepResponse(products[0], products[0]);
	},
	async (product, { container }) => {
		if (product) {
			// Rollback: delete the product if something fails later
			const productService = container.resolve("productService");
			await productService.deleteProduct(product.id);
		}
	}
);

// Step 2: Create rules and time slots for the product
const createRulesStep = createStep(
	"create-rules",
	async (input: CreateProductWithRulesInput & { product: any }, { container }) => {
		const rulesService: ProductScheduleModuleService = container.resolve(PRODUCT_SCHEDULE_MODULE);

		const createdRules = [];

		for (const ruleData of input.rules) {
			// Create the rule
			const rule = await rulesService.createProductRules({
				product_id: input.product.id,
				title: ruleData.title,
			});

			// Create time slots if provided
			const createdTimeSlots = [];
			if (ruleData.time_slots) {
				for (const timeSlot of ruleData.time_slots) {
					const timeSlotRecord = await rulesService.createTimeSlots({
						product_id: input.product.id,
						rule: rule.id,
						start_time: timeSlot.start_time,
						end_time: timeSlot.end_time,
						capacity: timeSlot.capacity,
					});
					createdTimeSlots.push(timeSlotRecord);
				}
			}

			createdRules.push({ rule, timeSlots: createdTimeSlots });
		}

		return new StepResponse(createdRules, createdRules);
	},
	async (rules, { container }) => {
		if (rules) {
			// Rollback: delete rules and time slots if something fails
			const rulesService: ProductScheduleModuleService = container.resolve(PRODUCT_SCHEDULE_MODULE);

			for (const ruleData of rules) {
				// Delete time slots first (due to foreign key constraint)
				if (ruleData.timeSlots) {
					for (const timeSlot of ruleData.timeSlots) {
						await rulesService.deleteTimeSlots(timeSlot.id);
					}
				}

				// Delete the rule
				await rulesService.deleteProductRules(ruleData.rule.id);
			}
		}
	}
);

export const createProductWithRulesWorkflow = createWorkflow(
	"create-product-with-rules",
	(input: CreateProductWithRulesInput) => {
		// Step 1: Create product
		const product = createProductStep(input);

		// Step 2: Create rules and time slots
		const rules = createRulesStep({
			...input,
			product: product,
		});

		return new WorkflowResponse({
			product,
			rules,
		});
	}
);
