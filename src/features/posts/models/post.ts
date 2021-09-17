import { z } from 'zod';

export const PostPayloadSchema = z.object({
	title: z.string().length(50).nonempty(),
	content: z.string().nonempty(),
	user_id: z.number().nonnegative(),
	category_id: z.number().nonnegative(),
});

export type PostPayload = z.infer<typeof PostPayloadSchema>;

export const PostSchema = PostPayloadSchema.extend({
	post_id: z.number().nonnegative(),
	user_name: z.string(),
	category_name: z.string(),
});

export type Post = z.infer<typeof PostSchema>;
