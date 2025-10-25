import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { z } from "zod";
import { createRuleWorkflow } from "../../../workflows/create-rule-workflow";

const CreateRuleSchema = z.object({
	product_id: z.string(),
	rule_name: z.string(),
});

export async function POST(req: MedusaRequest, res: MedusaResponse) {
	const { product_id, rule_name } = CreateRuleSchema.parse(req.body);

	const { result: rule } = await createRuleWorkflow(req.scope).run({
		input: {
			product_id,
			rule_name,
		},
	});

	res.json({ rule });
}
