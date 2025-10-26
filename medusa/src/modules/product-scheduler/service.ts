import { MedusaService } from "@medusajs/framework/utils";
import { ProductExtension } from "./models/product-extension";
import ProductRule from "./models/product-rule";
import TimeSlot from "./models/product-time-slot";

class ProductScheduleModuleService extends MedusaService({
	ProductRule,
	TimeSlot,
	ProductExtension,
}) {}

export default ProductScheduleModuleService;
