import { resolveNodeKind } from './DocKind';
import { NavigationItem } from './NavigationItem';
import { SearchButton } from './ui/SearchButton';

export async function Navigation({
	className = '',
	packageName,
	version,
}: {
	readonly className?: string;
	readonly packageName: string;
	readonly version: string;
}) {
	const fileContent = await fetch(
		`${process.env.BLOB_STORAGE_URL}/rewrite/${packageName}/${version}.sitemap.api.json`,
		{ cache: 'no-store' },
	);
	const node = await fileContent.json();

	const groupedNodes = node.reduce((acc: any, node: any) => {
		(acc[node.kind.toLowerCase()] ||= []).push(node);
		return acc;
	}, {});

	return (
		<aside className={`flex max-w-52 flex-col gap-4 lg:max-w-72 ${className}`}>
			<div className="flex flex-col gap-2">
				<h2 className="text-xl font-bold">{packageName}</h2>
				<h3 className="text-lg font-semibold">{version}</h3>
			</div>

			<SearchButton />

			<nav className="flex flex-col gap-4">
				<h4 className="font-semibold">Classes</h4>
				<div className="flex flex-col gap-1.5">
					{groupedNodes.class.map((node: any, idx: number) => {
						const kind = resolveNodeKind(node.kind);
						return (
							<NavigationItem key={`${node.name}-${idx}`} node={node} packageName={packageName} version={version}>
								<div className={`inline-block h-6 w-6 rounded-full text-center ${kind.background} ${kind.text}`}>
									{node.kind[0]}
								</div>{' '}
								<span className="font-sans">{node.name}</span>
							</NavigationItem>
						);
					})}
				</div>

				<h4 className="font-semibold">Functions</h4>
				<div className="flex flex-col gap-1.5">
					{groupedNodes.function.map((node: any, idx: number) => {
						const kind = resolveNodeKind(node.kind);
						return (
							<NavigationItem key={`${node.name}-${idx}`} node={node} packageName={packageName} version={version}>
								<div className={`inline-block h-6 w-6 rounded-full text-center ${kind.background} ${kind.text}`}>
									{node.kind[0]}
								</div>{' '}
								<span className="font-sans">{node.name}</span>
							</NavigationItem>
						);
					})}
				</div>

				<h4 className="font-semibold">Enums</h4>
				<div className="flex flex-col gap-1.5">
					{groupedNodes.enum.map((node: any, idx: number) => {
						const kind = resolveNodeKind(node.kind);
						return (
							<NavigationItem key={`${node.name}-${idx}`} node={node} packageName={packageName} version={version}>
								<div className={`inline-block h-6 w-6 rounded-full text-center ${kind.background} ${kind.text}`}>
									{node.kind[0]}
								</div>{' '}
								<span className="font-sans">{node.name}</span>
							</NavigationItem>
						);
					})}
				</div>

				<h4 className="font-semibold">Interfaces</h4>
				<div className="flex flex-col gap-1.5">
					{groupedNodes.interface.map((node: any, idx: number) => {
						const kind = resolveNodeKind(node.kind);
						return (
							<NavigationItem key={`${node.name}-${idx}`} node={node} packageName={packageName} version={version}>
								<div className={`inline-block h-6 w-6 rounded-full text-center ${kind.background} ${kind.text}`}>
									{node.kind[0]}
								</div>{' '}
								<span className="font-sans">{node.name}</span>
							</NavigationItem>
						);
					})}
				</div>

				<h4 className="font-semibold">Types</h4>
				<div className="flex flex-col gap-1.5">
					{groupedNodes.typealias.map((node: any, idx: number) => {
						const kind = resolveNodeKind(node.kind);
						return (
							<NavigationItem key={`${node.name}-${idx}`} node={node} packageName={packageName} version={version}>
								<div className={`inline-block h-6 w-6 rounded-full text-center ${kind.background} ${kind.text}`}>
									{node.kind[0]}
								</div>{' '}
								<span className="font-sans">{node.name}</span>
							</NavigationItem>
						);
					})}
				</div>

				<h4 className="font-semibold">Variables</h4>
				<div className="flex flex-col gap-1.5">
					{groupedNodes.variable.map((node: any, idx: number) => {
						const kind = resolveNodeKind(node.kind);
						return (
							<NavigationItem key={`${node.name}-${idx}`} node={node} packageName={packageName} version={version}>
								<div className={`inline-block h-6 w-6 rounded-full text-center ${kind.background} ${kind.text}`}>
									{node.kind[0]}
								</div>{' '}
								<span className="font-sans">{node.name}</span>
							</NavigationItem>
						);
					})}
				</div>
			</nav>
		</aside>
	);
}
