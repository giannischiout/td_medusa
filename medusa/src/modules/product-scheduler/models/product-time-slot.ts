import { model } from "@medusajs/framework/utils";
import ProductRule from "./product-rule";

const TimeSlot = model.define("timeSlot", {
	id: model.id().primaryKey(),
	product_id: model.text(),
	rule: model.belongsTo(() => ProductRule, {
		mappedBy: "timeSlot",
		onDelete: "CASCADE",
	}),
	start_time: model.text(),
	end_time: model.text(),
	capacity: model.number(),
});

export default TimeSlot;
