import { VscSymbolMethod } from '@react-icons/all-files/vsc/VscSymbolMethod';
import { Code2 } from 'lucide-react';
import { Badges } from './Badges';
import { DeprecatedNode } from './DeprecatedNode';
import { ExampleNode } from './ExampleNode';
import { ExcerptNode } from './ExcerptNode';
import { InheritedFromNode } from './InheritedFromNode';
import { ParameterNode } from './ParameterNode';
import { ReturnNode } from './ReturnNode';
import { SeeNode } from './SeeNode';
import { SummaryNode } from './SummaryNode';
import { TypeParameterNode } from './TypeParameterNode';
import { Tab, TabList, TabPanel, Tabs } from './ui/Tabs';

async function MethodBodyNode({
	method,
	packageName,
	version,
	overload = false,
}: {
	readonly method: any;
	readonly overload?: boolean;
	readonly packageName: string;
	readonly version: string;
}) {
	return (
		<>
			<div className="flex flex-col gap-4">
				<div className="flex place-content-between place-items-center">
					<h3
						id={method.displayName}
						className={`${overload ? 'scroll-mt-16' : 'scroll-mt-8'} break-words font-mono font-semibold`}
					>
						<Badges node={method} /> {method.displayName}
						{method.typeParameters?.length ? (
							<>
								{'<'}
								<TypeParameterNode node={method.typeParameters} version={version} />
								{'>'}
							</>
						) : null}
						({method.parameters?.length ? <ParameterNode node={method.parameters} version={version} /> : null}
						) : <ExcerptNode node={method.returnTypeExcerpt} version={version} />
					</h3>

					<a
						aria-label="Open source file in new tab"
						className="min-w-min"
						href={method.sourceLine ? `${method.sourceURL}#L${method.sourceLine}` : method.sourceURL}
						rel="external noreferrer noopener"
						target="_blank"
					>
						<Code2
							aria-hidden
							size={20}
							className="text-neutral-500 hover:text-neutral-600 dark:text-neutral-400 dark:hover:text-neutral-300"
						/>
					</a>
				</div>

				{method.summary?.deprecatedBlock.length ? (
					<DeprecatedNode deprecatedBlock={method.summary.deprecatedBlock} version={version} />
				) : null}

				{method.summary?.summarySection.length ? (
					<SummaryNode padding node={method.summary.summarySection} version={version} />
				) : null}

				{method.summary?.exampleBlocks.length ? (
					<ExampleNode node={method.summary.exampleBlocks} version={version} />
				) : null}

				{method.summary?.returnsBlock.length ? (
					<ReturnNode padding node={method.summary.returnsBlock} version={version} />
				) : null}

				{method.inheritedFrom ? (
					<InheritedFromNode node={method.inheritedFrom} packageName={packageName} version={version} />
				) : null}

				{method.summary?.seeBlocks.length ? (
					<SeeNode padding node={method.summary.seeBlocks} version={version} />
				) : null}
			</div>
			<div aria-hidden className="px-4">
				<div role="separator" className="h-[2px] bg-neutral-300 dark:bg-neutral-700" />
			</div>
		</>
	);
}

async function OverloadNode({
	method,
	packageName,
	version,
}: {
	readonly method: any;
	readonly packageName: string;
	readonly version: string;
}) {
	return (
		<Tabs className="flex flex-col gap-4">
			<TabList className="flex gap-2">
				{method.overloads.map((overload: any, idx: number) => {
					return (
						<Tab
							id={`overload-${overload.displayName}-${overload.overloadIndex}`}
							key={`overload-tab-${overload.displayName}-${idx}`}
							className="cursor-pointer rounded-full bg-neutral-800/10 px-2 py-1 font-sans text-sm font-normal leading-none text-neutral-800 hover:bg-neutral-800/20 data-[selected]:bg-neutral-500 data-[selected]:text-neutral-100 dark:bg-neutral-200/10 dark:text-neutral-200 dark:hover:bg-neutral-200/20 dark:data-[selected]:bg-neutral-500/70"
						>
							<span>Overload {overload.overloadIndex}</span>
						</Tab>
					);
				})}
			</TabList>
			{method.overloads.map((overload: any, idx: number) => {
				return (
					<TabPanel
						id={`overload-${overload.displayName}-${overload.overloadIndex}`}
						key={`overload-tab-panel-${overload.displayName}-${idx}`}
						className="flex flex-col gap-8"
					>
						<MethodBodyNode overload method={overload} packageName={packageName} version={version} />
					</TabPanel>
				);
			})}
		</Tabs>
	);
}

export async function MethodNode({
	node,
	packageName,
	version,
}: {
	readonly node: any;
	readonly packageName: string;
	readonly version: string;
}) {
	return (
		<div className="flex flex-col gap-8">
			<h2 className="flex place-items-center gap-2 text-xl font-bold">
				<VscSymbolMethod aria-hidden className="flex-shrink-0" size={24} /> Methods
			</h2>

			<div className="flex flex-col gap-8">
				{node.map((method: any, idx: number) => {
					return method.overloads?.length ? (
						<OverloadNode
							key={`${method.displayName}-${idx}`}
							method={method}
							packageName={packageName}
							version={version}
						/>
					) : (
						<MethodBodyNode
							key={`${method.displayName}-${idx}`}
							method={method}
							packageName={packageName}
							version={version}
						/>
					);
				})}
			</div>
		</div>
	);
}
