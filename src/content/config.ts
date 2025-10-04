import { z, defineCollection } from "astro:content";

function removeDupsAndLowerCase(array: string[]) {
	if (!array.length) return array;
	const lowercaseItems = array.map((str) => str.toLowerCase());
	const distinctItems = new Set(lowercaseItems);
	return Array.from(distinctItems);
}

const post = defineCollection({
	type: "content",
	schema: ({ image }) =>
		z.object({
			title: z.string().max(60),
			description: z.string().min(50).max(160),
			publishDate: z
				.string()
				.or(z.date())
				.transform((val) => new Date(val)),
			updatedDate: z
				.string()
				.optional()
				.transform((str) => (str ? new Date(str) : undefined)),
			coverImage: z
				.object({
					src: image(),
					alt: z.string(),
				})
				.optional(),
			draft: z.boolean().default(false),
			tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
			ogImage: z.string().optional(),
		}),
});

const meeting = defineCollection({
	type: "content",
	schema: ({ image }) =>
		z.object({
			title: z.string().max(100),
			author: z.string(),
			startDate: z
				.string()
				.or(z.date())
				.transform((val) => new Date(val)),
			bookType: z.enum(["book", "paper", "article"]).default("book"),
			genre: z.string().optional(),
			coverImage: z
				.object({
					src: image(),
					alt: z.string(),
				})
				.optional(),
			summary: z.string().optional(),
			keyTakeaways: z.array(z.string()).default([]),
			discussionQuestions: z.array(z.string()).default([]),
			participants: z.array(z.string()).default([]),
		}),
});

export const collections = { post, meeting };
