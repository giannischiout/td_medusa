import { defineLink } from "@medusajs/framework/utils";
import ProductModule from "@medusajs/medusa/product";
import ProductScheduleModule from "../modules/product-scheduler";

export default defineLink(ProductModule.linkable.product, ProductScheduleModule.linkable.productExtension);
