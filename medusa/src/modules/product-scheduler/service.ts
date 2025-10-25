import { MedusaService } from "@medusajs/framework/utils";
import ProductRule from "./models/product-rule";
import TimeSlot from "./models/product-time-slot";

class ProductScheduleModuleService extends MedusaService({
	ProductRule,
	TimeSlot,
}) {}

export default ProductScheduleModuleService;
