import { model } from "@medusajs/framework/utils";
import TimeSlot from "./product-time-slot";

const ProductRule = model.define("productRule", {
	id: model.id().primaryKey(),
	product_id: model.text(),
	title: model.text(),
	// 👇 A rule can have multiple time slots
	time_slots: model.hasMany(() => TimeSlot, {
		mappedBy: "rule",
	}),
});

export default ProductRule;
