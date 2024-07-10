'use client'
import { ArrowsPointingOutIcon } from '@heroicons/react/20/solid'
import { Pagination } from '@mui/material'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import NProgress from 'nprogress'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Document, Page } from 'react-pdf'
import { routes } from '../../services/routes'

type Props = {
	children: React.ReactNode
	pdfUrl: string
	isAdmin?: boolean
}

const SinglePagePdfRender: React.FC<Props> = ({ pdfUrl, children, isAdmin }) => {
	const router = useRouter()
	const params = useParams()
	const searchParams = useSearchParams()

	const baseUrl = isAdmin ? routes.admin.slideDecks.single : routes.slideDecks.single

	const id = params.id
	const page = searchParams.get('page') || '1'

	const parentRef = useRef<HTMLDivElement | null>(null)
	const documentRef = useRef<HTMLDivElement | null>(null)

	const [pageWidth, setPageWidth] = useState(1000)
	const [totalPages, setTotalPages] = useState<number>(0)

	/** For handle resize of pdf according to parent. */
	useEffect(() => {
		const handleResize = () => {
			if (document.fullscreenElement) {
				setPageWidth(window.innerWidth)
			} else if (parentRef.current) {
				setPageWidth(parentRef.current.offsetWidth)
			}
		}

		document.addEventListener('fullscreenchange', handleResize)
		window.addEventListener('resize', handleResize)

		return () => {
			document.removeEventListener('fullscreenchange', handleResize)
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			const pageNum = Number(page)
			const idNum = Number(id)

			if (event.key === 'ArrowLeft' && pageNum > 1) {
				NProgress.start()
				router.push(baseUrl(idNum, pageNum - 1))
			} else if (event.key === 'ArrowRight' && pageNum < totalPages) {
				NProgress.start()
				router.push(baseUrl(idNum, pageNum + 1))
			} else if (event.key === 'f' || event.key === 'F') {
				toggleFullScreen()
			}
		},
		[id, page, totalPages, router, baseUrl],
	)

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown)

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [handleKeyDown])

	const toggleFullScreen = () => {
		if (!document.fullscreenElement) {
			documentRef.current?.requestFullscreen().catch((err) => {
				console.error(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`)
			})
		} else {
			document.exitFullscreen()
		}
	}

	const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
		setTotalPages(numPages)
	}

	return (
		<main className="container xl:flex gap-8 py-6">
			<div ref={parentRef} className="w-full xl:w-3/4">
				<div ref={documentRef} className="relative fullscreen:flex fullscreen:justify-center fullscreen:items-center">
					<div className="absolute bottom-0 right-0 z-10 opacity-50 hover:opacity-100 transition-opacity">
						<button onClick={toggleFullScreen} className="p-4">
							<ArrowsPointingOutIcon className="w-5 h-5" />
						</button>
					</div>
					<Document file={pdfUrl} loading={<div style={{ width: pageWidth }} className="h-[600px] bg-gray-200 animate-pulse" />} onLoadSuccess={onDocumentLoadSuccess}>
						<Page loading={<div style={{ width: pageWidth }} className="h-[600px] bg-white" />} pageNumber={Number(page)} width={pageWidth} className="border border-gray-400" />
					</Document>
				</div>

				<div className="flex justify-center mt-4">
					<Pagination
						color="primary"
						count={totalPages}
						siblingCount={6}
						page={Number(page)}
						onChange={(_, number) => {
							// Need to start this manually because the package does not support router.push
							NProgress.start()
							router.push(baseUrl(Number(id), number))
						}}
					/>
				</div>
			</div>

			<div className="w-full lg:w-1/2 xl:w-1/4">{children}</div>
		</main>
	)
}

export default SinglePagePdfRender
