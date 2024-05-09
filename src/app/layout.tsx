import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Footer } from '../components/layout/Footer'
import { Navbar } from '../components/layout/Navbar'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Maddy',
	description: 'Ein interaktives Tool, das es Studierenden ermöglicht, Vorlesungsfolien anzuzeigen und Verständnisprobleme zu markieren.',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" type="image/svg+xml" href="/assets/images/favicon.svg" />
				<link rel="icon" type="image/png" href="/assets/images/favicon.png" />
			</head>
			<body className={inter.className}>
				<Navbar />
				{children}
				<Footer />
			</body>
		</html>
	)
}
