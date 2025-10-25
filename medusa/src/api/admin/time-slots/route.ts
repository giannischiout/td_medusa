import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { z } from "zod";
import { PRODUCT_SCHEDULE_MODULE } from "../../../modules/product-scheduler";
import ProductScheduleModuleService from "../../../modules/product-scheduler/service";
import { createTimeSlotsWorkflow } from "../../../workflows/create-time-slots-workflow";

const CreateTimeSlotsSchema = z.object({
	rule_id: z.string(),
	product_id: z.string(),
	time_slots: z.array(
		z.object({
			start_time: z.string(),
			end_time: z.string(),
			capacity: z.number(),
		})
	),
});

const GetTimeSlotsSchema = z.object({
	rule_id: z.string().optional(),
	product_id: z.string().optional(),
});

export async function GET(req: MedusaRequest, res: MedusaResponse) {
	const { rule_id, product_id } = GetTimeSlotsSchema.parse(req.query);

	const rulesService: ProductScheduleModuleService = req.scope.resolve(PRODUCT_SCHEDULE_MODULE);

	let timeSlots;
	if (rule_id) {
		// Get time slots for a specific rule
		timeSlots = await rulesService.listTimeSlots({ rule: rule_id });
	} else if (product_id) {
		// Get all time slots for a product
		timeSlots = await rulesService.listTimeSlots({ product_id });
	} else {
		// Get all time slots
		timeSlots = await rulesService.listTimeSlots();
	}

	res.json({ timeSlots });
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
	const { rule_id, product_id, time_slots } = CreateTimeSlotsSchema.parse(req.body);

	const { result: timeSlots } = await createTimeSlotsWorkflow(req.scope).run({
		input: {
			rule_id,
			product_id,
			time_slots,
		},
	});

	res.json({ timeSlots });
}
