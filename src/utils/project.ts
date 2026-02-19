import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";

export async function getAllProjects() {
	return await getCollection("project", ({ data }) => {
		return import.meta.env.PROD ? data.draft !== true : true;
	});
}

export function sortProjects(projects: Array<CollectionEntry<"project">>) {
	const order = ["jkl", "sps", "cheapcompute"];
	return projects.sort((a, b) => {
		const indexA = order.indexOf(a.slug);
		const indexB = order.indexOf(b.slug);
		// If both are in the order array, sort by their position
		if (indexA !== -1 && indexB !== -1) {
			return indexA - indexB;
		}
		// If only one is in the order array, prioritize it
		if (indexA !== -1) return -1;
		if (indexB !== -1) return 1;
		// If neither is in the order array, maintain original order
		return 0;
	});
}
