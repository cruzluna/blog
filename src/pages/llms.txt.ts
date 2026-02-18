import { siteConfig } from "@/site-config";

export const GET = () => {
	const content = `# ${siteConfig.author} - llms.txt

> Machine-readable resume and about information for LLMs and AI assistants.

## About

TODO: Add your about me text here.

## Resume

TODO: Add your resume text here.
`;

	return new Response(content, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
			"Cache-Control": "public, max-age=3600",
		},
	});
};
