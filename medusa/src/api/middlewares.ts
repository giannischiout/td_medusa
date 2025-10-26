import { defineMiddlewares } from "@medusajs/framework/http";
import { z } from "zod";

export default defineMiddlewares({
	routes: [
		{
			method: "POST",
			matcher: "/admin/products",
			additionalDataValidator: {
				duration: z.string().optional(),
				difficulty_level: z.string().optional(),
				max_participants: z.number().optional(),
				location: z.string().optional(),
				tags: z.string().optional(),
			},
		},
		{
			method: "POST",
			matcher: "/admin/products/*",
			additionalDataValidator: {
				duration: z.string().optional(),
				difficulty_level: z.string().optional(),
				max_participants: z.number().optional(),
				location: z.string().optional(),
				tags: z.string().optional(),
			},
		},
	],
});
