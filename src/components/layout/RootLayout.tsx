'use client'
import { StyledEngineProvider, ThemeProvider, createTheme } from '@mui/material'
import { Inter } from 'next/font/google'
import React from 'react'
import { pdfjs } from 'react-pdf'
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
})

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString()

export const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
	return (
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={theme}>
				<html lang="en">
					<body className={inter.className}>
						<Navbar />
						{children}
						<Footer />
					</body>
				</html>
			</ThemeProvider>
		</StyledEngineProvider>
	)
}
