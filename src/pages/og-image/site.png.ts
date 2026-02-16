import type { APIContext } from "astro";
import satori, { type SatoriOptions } from "satori";
import { html } from "satori-html";
import { Resvg } from "@resvg/resvg-js";

import GeistRegular from "@fontsource/geist/files/geist-latin-400-normal.woff";
import GeistSemiBold from "@fontsource/geist/files/geist-latin-600-normal.woff";

const ogOptions: SatoriOptions = {
	width: 1200,
	height: 630,
	fonts: [
		{
			name: "Geist",
			data: Buffer.from(GeistRegular),
			weight: 400,
			style: "normal",
		},
		{
			name: "Geist",
			data: Buffer.from(GeistSemiBold),
			weight: 600,
			style: "normal",
		},
	],
};

const markup = html`
	<div tw="flex h-full w-full items-center justify-center bg-white text-black">
		<h1 tw="text-8xl font-semibold lowercase">cruz luna</h1>
	</div>
`;

export async function GET(_context: APIContext) {
	const svg = await satori(markup, ogOptions);
	const png = new Resvg(svg).render().asPng();

	return new Response(png, {
		headers: {
			"Content-Type": "image/png",
			"Cache-Control": "public, max-age=31536000, immutable",
		},
	});
}
