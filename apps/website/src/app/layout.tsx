import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import type { PropsWithChildren } from 'react';
import { Providers } from './providers';

import '~/styles/main.css';
import 'overlayscrollbars/overlayscrollbars.css';

export default async function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} antialiased`} suppressHydrationWarning>
			<body className="bg-white dark:bg-[#121212]">
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
