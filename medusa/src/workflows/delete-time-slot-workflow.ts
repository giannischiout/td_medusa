import { StepResponse, WorkflowResponse, createStep, createWorkflow } from "@medusajs/framework/workflows-sdk";
import { PRODUCT_SCHEDULE_MODULE } from "../modules/product-scheduler";
import ProductScheduleModuleService from "../modules/product-scheduler/service";

type DeleteTimeSlotInput = {
	time_slot_id: string;
};

const deleteTimeSlotStep = createStep(
	"delete-time-slot",
	async ({ time_slot_id }: DeleteTimeSlotInput, { container }) => {
		const rulesService: ProductScheduleModuleService = container.resolve(PRODUCT_SCHEDULE_MODULE);

		// Get the time slot before deleting (for rollback)
		const timeSlot = await rulesService.retrieveTimeSlots(time_slot_id);

		// Delete the time slot
		await rulesService.deleteTimeSlots(time_slot_id);

		return new StepResponse({ deleted: true, timeSlot }, timeSlot);
	},
	async (originalTimeSlot, { container }) => {
		if (originalTimeSlot) {
			const rulesService: ProductScheduleModuleService = container.resolve(PRODUCT_SCHEDULE_MODULE);
			// Rollback: recreate the time slot
			await rulesService.createTimeSlots({
				product_id: originalTimeSlot.product_id,
				rule: originalTimeSlot.rule.id,
				start_time: originalTimeSlot.start_time,
				end_time: originalTimeSlot.end_time,
				capacity: originalTimeSlot.capacity,
			});
		}
	}
);

export const deleteTimeSlotWorkflow = createWorkflow("delete-time-slot", (input: DeleteTimeSlotInput) => {
	const result = deleteTimeSlotStep(input);
	return new WorkflowResponse(result);
});
