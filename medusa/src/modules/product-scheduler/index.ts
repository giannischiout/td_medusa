import { Module } from "@medusajs/framework/utils";
import ProductScheduleModuleService from "./service";

export const PRODUCT_SCHEDULE_MODULE = "productSchedule";

export default Module(PRODUCT_SCHEDULE_MODULE, {
	service: ProductScheduleModuleService,
});
