import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";

export async function getAllProjects() {
	return await getCollection("project", ({ data }) => {
		return import.meta.env.PROD ? data.draft !== true : true;
	});
}
