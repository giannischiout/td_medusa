import { StepResponse, WorkflowResponse, createStep, createWorkflow } from "@medusajs/framework/workflows-sdk";
import { PRODUCT_SCHEDULE_MODULE } from "../modules/product-scheduler";
import ProductScheduleModuleService from "../modules/product-scheduler/service";

type UpdateRuleInput = {
	rule_id: string;
	title?: string;
	// Add other rule fields as needed
};

const updateRuleStep = createStep(
	"update-rule",
	async ({ rule_id, title }: UpdateRuleInput, { container }) => {
		const rulesService: ProductScheduleModuleService = container.resolve(PRODUCT_SCHEDULE_MODULE);

		// Update the rule
		const updatedRule = await rulesService.updateProductRules(rule_id, {
			title,
		});

		return new StepResponse(updatedRule, updatedRule);
	},
	async (originalRule, { container }) => {
		if (originalRule) {
			const rulesService: ProductScheduleModuleService = container.resolve(PRODUCT_SCHEDULE_MODULE);
			// Rollback to original state
			await rulesService.updateProductRules(originalRule.id, {
				title: originalRule.title,
			});
		}
	}
);

export const updateRuleWorkflow = createWorkflow("update-rule", (input: UpdateRuleInput) => {
	const rule = updateRuleStep(input);
	return new WorkflowResponse(rule);
});
