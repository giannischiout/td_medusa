import { StepResponse, WorkflowResponse, createStep, createWorkflow } from "@medusajs/framework/workflows-sdk";
import { PRODUCT_SCHEDULE_MODULE } from "../modules/product-scheduler";
import ProductScheduleModuleService from "../modules/product-scheduler/service";

type CreateTimeSlotsInput = {
	rule_id: string;
	product_id: string;
	time_slots: Array<{
		start_time: string;
		end_time: string;
		capacity: number;
	}>;
};

const createTimeSlotsStep = createStep(
	"create-time-slots",
	async ({ rule_id, product_id, time_slots }: CreateTimeSlotsInput, { container }) => {
		const rulesService: ProductScheduleModuleService = container.resolve(PRODUCT_SCHEDULE_MODULE);

		const createdTimeSlots = [];

		for (const timeSlot of time_slots) {
			const timeSlotRecord = await rulesService.createTimeSlots({
				product_id,
				rule: rule_id,
				start_time: timeSlot.start_time,
				end_time: timeSlot.end_time,
				capacity: timeSlot.capacity,
			});
			createdTimeSlots.push(timeSlotRecord);
		}

		return new StepResponse(createdTimeSlots, createdTimeSlots);
	},
	async (timeSlots, { container }) => {
		if (timeSlots) {
			const rulesService: ProductScheduleModuleService = container.resolve(PRODUCT_SCHEDULE_MODULE);

			// Delete time slots in reverse order
			for (const timeSlot of timeSlots.reverse()) {
				await rulesService.deleteTimeSlots(timeSlot.id);
			}
		}
	}
);

export const createTimeSlotsWorkflow = createWorkflow("create-time-slots-for-rule", (input: CreateTimeSlotsInput) => {
	const timeSlots = createTimeSlotsStep(input);
	return new WorkflowResponse(timeSlots);
});
