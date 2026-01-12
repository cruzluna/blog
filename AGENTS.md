# AGENTS.md

This file provides guidelines for agentic coding agents operating in this repository.

## Build/Lint/Test Commands

| Command          | Action                                          |
| :--------------- | :---------------------------------------------- |
| `pnpm dev`       | Start local dev server at `localhost:3000`      |
| `pnpm build`     | Build production site to `./dist/`              |
| `pnpm postbuild` | Run Pagefind to build static search index       |
| `pnpm preview`   | Preview production build locally                |
| `pnpm format`    | Format all files with Prettier (includes cache) |
| `pnpm check`     | Run Astro TypeScript type checking              |

**Note:** No test framework is configured in this codebase.

## Code Style Guidelines

### Formatting

- Use 2-space indentation (not tabs)
- Run `pnpm format` before committing
- Double quotes for strings, semicolons required
- Follow `.editorconfig` settings

### Imports

Use path aliases configured in `tsconfig.json`:

- `@/assets/*` → `src/assets/*`
- `@/components/*` → `src/components/*.astro`
- `@/layouts/*` → `src/layouts/*.astro`
- `@/utils` → `src/utils/index.ts`
- `@/stores/*` → `src/stores/*`
- `@/types` → `src/types.ts`
- `@/site-config` → `src/site.config.ts`

Organize imports alphabetically within groups.

### Types

- Extend `astro/tsconfigs/strictest` TypeScript config
- Define types in `src/types.ts` or content schemas
- Use Zod schemas in `src/content/config.ts` for content validation
- Prefer explicit types over inference for function signatures

### Naming Conventions

- `PascalCase` for Astro components
- `camelCase` for utility functions and variables
- `SCREAMING_SNAKE_CASE` for constants
- Use descriptive, intention-revealing names

### Error Handling

- Let errors bubble up in Astro pages
- Use optional chaining and nullish coalescing for safe access
- Return early for error conditions

### Astro Components

- Define `Props` type using TypeScript interfaces
- Destructure props explicitly in component frontmatter
- Keep business logic in `src/utils/` when possible

### Content Collections

- Use Zod schemas for frontmatter validation in `src/content/config.ts`
- Posts go in `src/content/post/` with `.md` or `.mdx` extension
- Follow frontmatter schema for titles (max 60 chars), descriptions (50-160 chars), dates, and tags

## Content Rule

**NEVER add substantive content to the blog. Only suggest improvements:**

- Grammar fixes and typo corrections
- Structural reorganization of existing content
- Clarity and readability improvements
- Any content addition or rewriting must be explicitly approved by the user before implementation

## Common Patterns

### Astro Component Props Example

```typescript
---
import type { HTMLAttributes } from "astro/types";
import { getFormattedDate } from "@/utils";

type Props = HTMLAttributes<"time"> & {
  date: Date;
  dateTimeOptions?: Intl.DateTimeFormatOptions;
};

const { date, dateTimeOptions, ...attrs } = Astro.props;
const postDate = getFormattedDate(date, dateTimeOptions);
---

<time datetime={date.toISOString()} {...attrs}>
  {postDate}
</time>
```

### Utility Function Example

```typescript
import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";

export async function getAllPosts() {
	return await getCollection("post", ({ data }) => {
		return import.meta.env.PROD ? data.draft !== true : true;
	});
}
```

### Content Collection Schema Example

```typescript
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
			tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
		}),
});
```

## Project Structure

```
src/
├── assets/          # Static images and fonts
├── components/      # Astro components (.astro)
│   └── layout/      # Layout components (Header, Footer)
├── content/         # Content collections
│   ├── post/        # Blog posts (.md/.mdx)
│   └── config.ts    # Zod schemas for content validation
├── layouts/         # Page layouts
├── pages/           # Astro pages and routes
├── styles/          # Global CSS
├── types.ts         # TypeScript types
├── site.config.ts   # Site configuration
└── utils/           # Utility functions
```

## Editor/Linting Configuration

- **ESLint**: Configured in `.eslintrc.cjs` with TypeScript and Astro support
- **Prettier**: Configured in `.prettierrc.js` with Astro and Tailwind plugins
- **TypeScript**: Strictest config in `tsconfig.json` with path aliases
- **EditorConfig**: Settings in `.editorconfig`

## No Existing Cursor/Copilot Rules

No Cursor rules (`.cursor/rules/` or `.cursorrules`) or Copilot instructions (`.github/copilot-instructions.md`) exist in this repository.
