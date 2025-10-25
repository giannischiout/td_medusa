import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { z } from "zod";
import { deleteTimeSlotWorkflow } from "../../../../workflows/delete-time-slot-workflow";
import { updateTimeSlotWorkflow } from "../../../../workflows/update-time-slot-workflow";

const UpdateTimeSlotSchema = z.object({
	start_time: z.string().optional(),
	end_time: z.string().optional(),
	capacity: z.number().optional(),
});

export async function PUT(req: MedusaRequest, res: MedusaResponse) {
	const { id } = req.params;
	const updateData = UpdateTimeSlotSchema.parse(req.body);

	const { result: timeSlot } = await updateTimeSlotWorkflow(req.scope).run({
		input: {
			time_slot_id: id,
			...updateData,
		},
	});

	res.json({ timeSlot });
}

export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
	const { id } = req.params;

	const { result } = await deleteTimeSlotWorkflow(req.scope).run({
		input: {
			time_slot_id: id,
		},
	});

	res.json({ result });
}
