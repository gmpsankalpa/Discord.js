import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import rehypeShikiFromHighlighter from '@shikijs/rehype/core';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { getHighlighterCore } from 'shiki/core';
import getWasm from 'shiki/wasm';

const highlighter = await getHighlighterCore({
	themes: [import('shiki/themes/vitesse-light.mjs'), import('shiki/themes/vitesse-dark.mjs')],
	langs: [import('shiki/langs/javascript.mjs'), import('shiki/langs/shellscript.mjs')],
	loadWasm: getWasm,
});

export default async function Page() {
	const fileContent = await readFile(join(process.cwd(), 'src/assets/readme/discord.js/home-README.md'), 'utf8');

	return (
		<div className="prose prose-neutral mx-auto max-w-screen-lg p-6 dark:prose-invert">
			<MDXRemote
				options={{
					mdxOptions: {
						remarkPlugins: [remarkGfm],
						rehypePlugins: [
							[
								rehypeShikiFromHighlighter as any,
								highlighter,
								{
									themes: {
										light: 'vitesse-light',
										dark: 'vitesse-dark',
									},
								},
							],
						],
					},
				}}
				source={fileContent}
			/>
		</div>
	);
}
