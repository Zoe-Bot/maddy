'use client'
import { StyledEngineProvider, ThemeProvider, createTheme } from '@mui/material'
import { Inter } from 'next/font/google'
import { usePathname, useSearchParams } from 'next/navigation'
import NextTopLoader from 'nextjs-toploader'
import NProgress from 'nprogress'
import React, { useEffect } from 'react'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

type RootLayoutProps = {
	children: React.ReactNode
}

const inter = Inter({ subsets: ['latin'] })

const theme = createTheme({
	palette: {
		primary: {
			main: '#25939f',
		},
		error: {
			main: '#eb3f3f',
		},
	},
	typography: {
		fontFamily: 'Inter, sans-serif',
	},
})

export const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
	const pathname = usePathname()
	const searchParams = useSearchParams()

	useEffect(() => {
		// Clear the progress bar when the component is mounted for router push
		NProgress.done()
	}, [pathname, searchParams])

	return (
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={theme}>
				<html lang="en">
					<body className={`${inter.className} flex flex-col min-h-screen h-screen`}>
						<NextTopLoader color="#245c66" initialPosition={0.08} height={8} showSpinner={true} crawl={true} crawlSpeed={200} easing="ease" speed={200} />
						<Navbar />
						{children}
						<Footer />
					</body>
				</html>
			</ThemeProvider>
		</StyledEngineProvider>
	)
}
