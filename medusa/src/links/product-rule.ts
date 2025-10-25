import { defineLink } from "@medusajs/framework/utils";
import ProductModule from "@medusajs/medusa/product";
import ProductScheduleModule from "../modules/product-scheduler";

export default defineLink(ProductScheduleModule.linkable.productRule, {
	linkable: ProductModule.linkable.product.id,
	isList: false,
});
