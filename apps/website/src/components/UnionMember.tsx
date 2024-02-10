import { ExcerptNode } from './ExcerptNode';

export async function UnionMember({ node, version }: { readonly node: any; readonly version: string }) {
	return (
		<div className="flex flex-col gap-8">
			<h2 className="text-lg font-bold">Union Members</h2>
			<span className="break-words font-mono text-sm">
				<ExcerptNode node={node} version={version} />
			</span>
		</div>
	);
}
