export type LearningPlaygroundStatus = "active" | "queued";

export type LearningPlaygroundItem = {
	title: string;
	notes: string;
	status: LearningPlaygroundStatus;
	href?: string;
};

export type LearningPlaygroundSection = {
	id: "prepping" | "learning" | "reading-list";
	title: string;
	description: string;
	items: LearningPlaygroundItem[];
};

export type RecentBookmark = {
	title: string;
	href: string;
	notes?: string;
	addedOn: string;
};

export const learningPlaygroundSections: LearningPlaygroundSection[] = [
	{
		id: "prepping",
		title: "Prepping",
		description: "Topics, projects, and goals I am actively preparing for.",
		items: [
			{
				title: "System design prep loop",
				notes: "Rotating through consistency, data modeling, and scaling drills.",
				status: "active",
			},
			{
				title: "Behavioral storytelling notes",
				notes: "Collecting recent project stories with measurable outcomes.",
				status: "queued",
			},
		],
	},
	{
		id: "learning",
		title: "Learning",
		description: "Hands-on concepts and tools I am working through right now.",
		items: [
			{
				title: "Rust ownership + async patterns",
				notes: "Building small utilities to internalize ownership and lifetimes.",
				status: "active",
			},
			{
				title: "Distributed systems reliability patterns",
				notes: "Reviewing backpressure, retries, and idempotency techniques.",
				status: "queued",
			},
		],
	},
	{
		id: "reading-list",
		title: "Reading List",
		description: "Books, papers, and articles to read and revisit.",
		items: [
			{
				title: "Designing Data-Intensive Applications",
				notes: "Re-reading chapters on replication and fault tolerance.",
				status: "active",
			},
			{
				title: "Add your next read here",
				notes: "Edit src/data/learning-playground.ts to append a new item.",
				status: "queued",
			},
		],
	},
];

export const recentBookmarks: RecentBookmark[] = [
	{
		title: "Architecture Notes — Caching Patterns",
		href: "https://example.com/caching-patterns",
		notes: "Good reminder on cache invalidation trade-offs for read-heavy paths.",
		addedOn: "2026-03-20",
	},
	{
		title: "Paper — The Tail at Scale",
		href: "https://research.google/pubs/the-tail-at-scale/",
		addedOn: "2026-03-18",
	},
	{
		title: "Add your next bookmark here",
		href: "https://example.com/",
		notes: "Append new bookmarks in src/data/learning-playground.ts.",
		addedOn: "YYYY-MM-DD",
	},
];
