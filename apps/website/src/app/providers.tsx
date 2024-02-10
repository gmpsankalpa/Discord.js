'use client';

import { Provider as JotaiProvider } from 'jotai';
import { ThemeProvider } from 'next-themes';
import type { PropsWithChildren } from 'react';
import { useSystemThemeFallback } from '~/hooks/useSystemThemeFallback';
import { useUnregisterServiceWorker } from '~/hooks/useUnregisterServiceWorker';

export function Providers({ children }: PropsWithChildren) {
	useUnregisterServiceWorker();
	useSystemThemeFallback();

	return (
		<JotaiProvider>
			<ThemeProvider attribute="class">{children}</ThemeProvider>
		</JotaiProvider>
	);
}
