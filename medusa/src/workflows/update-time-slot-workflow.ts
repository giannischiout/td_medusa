import { StepResponse, WorkflowResponse, createStep, createWorkflow } from "@medusajs/framework/workflows-sdk";
import { PRODUCT_SCHEDULE_MODULE } from "../modules/product-scheduler";
import ProductScheduleModuleService from "../modules/product-scheduler/service";

type UpdateTimeSlotInput = {
	time_slot_id: string;
	start_time?: string;
	end_time?: string;
	capacity?: number;
};

const updateTimeSlotStep = createStep(
	"update-time-slot",
	async ({ time_slot_id, start_time, end_time, capacity }: UpdateTimeSlotInput, { container }) => {
		const rulesService: ProductScheduleModuleService = container.resolve(PRODUCT_SCHEDULE_MODULE);

		// Update the time slot
		const updatedTimeSlot = await rulesService.updateTimeSlots(time_slot_id, {
			start_time,
			end_time,
			capacity,
		});

		return new StepResponse(updatedTimeSlot, updatedTimeSlot);
	},
	async (originalTimeSlot, { container }) => {
		if (originalTimeSlot) {
			const rulesService: ProductScheduleModuleService = container.resolve(PRODUCT_SCHEDULE_MODULE);
			// Rollback to original state
			await rulesService.updateTimeSlots(originalTimeSlot.id, {
				start_time: originalTimeSlot.start_time,
				end_time: originalTimeSlot.end_time,
				capacity: originalTimeSlot.capacity,
			});
		}
	}
);

export const updateTimeSlotWorkflow = createWorkflow("update-time-slot", (input: UpdateTimeSlotInput) => {
	const timeSlot = updateTimeSlotStep(input);
	return new WorkflowResponse(timeSlot);
});
