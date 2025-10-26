import { model } from "@medusajs/framework/utils";

export const ProductExtension = model.define("productExtension", {
	id: model.id().primaryKey(),
	product_id: model.text(),
	duration: model.text().nullable(),
	difficulty_level: model.text().nullable(),
	max_participants: model.number().nullable(),
	location: model.text().nullable(),
	tags: model.text().nullable(), // JSON string for storing multiple tags
});
