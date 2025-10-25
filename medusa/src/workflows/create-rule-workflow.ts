import { StepResponse, WorkflowResponse, createStep, createWorkflow } from "@medusajs/framework/workflows-sdk";
import { PRODUCT_SCHEDULE_MODULE } from "../modules/product-scheduler";
import ProductScheduleModuleService from "../modules/product-scheduler/service";

type CreateRuleInput = {
	product_id: string;
	rule_name: string;
};

const createRuleStep = createStep(
	"create-rule",
	async ({ product_id, rule_name }: CreateRuleInput, { container }) => {
		const rulesService: ProductScheduleModuleService = container.resolve(PRODUCT_SCHEDULE_MODULE);

		// Create the rule
		const rule = await rulesService.createProductRules({
			product_id,
			title: rule_name,
		});

		return new StepResponse(rule, rule);
	},
	async (rule, { container }) => {
		if (rule) {
			const rulesService: ProductScheduleModuleService = container.resolve(PRODUCT_SCHEDULE_MODULE);
			await rulesService.deleteProductRules(rule.id);
		}
	}
);

export const createRuleWorkflow = createWorkflow("create-rule-for-product", (input: CreateRuleInput) => {
	const rule = createRuleStep(input);
	return new WorkflowResponse(rule);
});
