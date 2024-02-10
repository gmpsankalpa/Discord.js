import dynamic from 'next/dynamic';
import type { PropsWithChildren } from 'react';
import { Navigation } from '~/components/Navigation';
import { OverlayScrollbarsComponent } from '~/components/OverlayScrollbars';
import { Drawer } from '~/components/ui/Drawer';

// eslint-disable-next-line promise/prefer-await-to-then
const CmdK = dynamic(async () => import('~/components/ui/CmdK').then((mod) => mod.CmdK), { ssr: false });

export default async function Layout({
	params,
	children,
}: PropsWithChildren<{ params: { item: string; packageName: string; version: string } }>) {
	return (
		// eslint-disable-next-line react/no-unknown-property
		<div vaul-drawer-wrapper="" className="mx-auto flex max-w-screen-xl flex-col gap-12 p-6 md:flex-row">
			<div className="sticky top-6 hidden flex-shrink-0 self-start md:block">
				<OverlayScrollbarsComponent
					className="max-h-[calc(100dvh-48px)]"
					defer
					options={{
						overflow: { x: 'hidden' },
						scrollbars: {
							autoHide: 'scroll',
							autoHideDelay: 500,
							autoHideSuspend: true,
							clickScroll: true,
						},
					}}
				>
					<Navigation className="pr-4" packageName={params.packageName} version={params.version} />
				</OverlayScrollbarsComponent>
			</div>
			{children}
			<div className="fixed bottom-0 left-0 right-0 md:hidden">
				<Drawer>
					<Navigation
						className="max-w-none overflow-auto p-0 lg:max-w-none"
						packageName={params.packageName}
						version={params.version}
					/>
				</Drawer>
			</div>
			<CmdK />
		</div>
	);
}
