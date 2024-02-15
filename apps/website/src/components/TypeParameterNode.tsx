import { Fragment } from 'react';
import { Badges } from './Badges';
import { DocNode } from './DocNode';
import { ExcerptNode } from './ExcerptNode';

export async function TypeParameterNode({
	description = false,
	node,
	version,
}: {
	readonly description?: boolean;
	readonly node: any;
	readonly version: string;
}) {
	return (
		<div className={`${description ? 'flex flex-col gap-8' : 'inline-block'}`}>
			{node.map((typeParameter: any, idx: number) => {
				return (
					<Fragment key={`${typeParameter.name}-${idx}`}>
						<div className={description ? '' : 'after:content-[",_"] last-of-type:after:content-none'}>
							<h3 className="break-words font-mono font-semibold">
								{description ? <Badges node={typeParameter} /> : null} {typeParameter.name}
								{typeParameter.isOptional ? '?' : ''}
								{typeParameter.constraintsExcerpt.length ? (
									<>
										{' extends '}
										<ExcerptNode node={typeParameter.constraintsExcerpt} version={version} />
									</>
								) : null}
								{typeParameter.defaultExcerpt.length ? (
									<>
										{' = '}
										<ExcerptNode node={typeParameter.defaultExcerpt} version={version} />
									</>
								) : null}
							</h3>

							{description && typeParameter.description?.length ? (
								<div className="pl-4">
									<DocNode node={typeParameter.description} version={version} />
								</div>
							) : null}
						</div>
					</Fragment>
				);
			})}
			{description ? (
				<div aria-hidden className="px-4">
					<div role="separator" className="h-[2px] bg-neutral-300 dark:bg-neutral-700" />
				</div>
			) : null}
		</div>
	);
}
