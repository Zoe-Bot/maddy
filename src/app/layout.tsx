import type { Metadata } from 'next'
import { RootLayout } from '../components/layout/RootLayout'
import './globals.css'

export const metadata: Metadata = {
	title: 'Maddy',
	description: 'Ein interaktives Tool, das es Studierenden ermöglicht, Vorlesungsfolien anzuzeigen und Verständnisprobleme zu markieren.',
	icons: [
		{
			url: '/images/favicon.svg',
		},
	],
}

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return <RootLayout>{children}</RootLayout>
}
