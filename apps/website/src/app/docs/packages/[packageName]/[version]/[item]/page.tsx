// import { readFile } from 'node:fs/promises';
// import { join } from 'node:path';
// import { inspect } from 'node:util';
import { DocItem } from '~/components/DocItem';

export default async function Page({ params }: { params: { item: string; packageName: string; version: string } }) {
	const normalizeItem = params.item.split(encodeURIComponent(':')).join('.').toLowerCase();

	// const fileContent = await readFile(
	// 	join(process.cwd(), `../../packages/${params.packageName}/docs/split/${params.version}.${normalizeItem}.api.json`),
	// 	'utf8',
	// );
	// const node = JSON.parse(fileContent);

	const fileContent = await fetch(
		`${process.env.BLOB_STORAGE_URL}/rewrite/${params.packageName}/${params.version}.${normalizeItem}.api.json`,
		{ cache: 'no-store' },
	);
	const node = await fileContent.json();

	// console.log(inspect(node, { depth: 0 }));

	return (
		<main className="flex w-full flex-col gap-8 pb-12 md:pb-0">
			<DocItem node={node} packageName={params.packageName} version={params.version} />
		</main>
	);
}
