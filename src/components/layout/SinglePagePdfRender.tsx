'use client'
import { Pagination } from '@mui/material'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { routes } from '../../services/routes'

type Props = {
	children: React.ReactNode
	pdfUrl: string
	isAdmin?: boolean
}

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString()

const SinglePagePdfRender: React.FC<Props> = ({ pdfUrl, children, isAdmin }) => {
	const router = useRouter()
	const params = useParams()
	const searchParams = useSearchParams()

	const baseUrl = isAdmin ? routes.admin.slideDecks.single : routes.slideDecks.single

	const id = params.id
	const page = searchParams.get('page') || '1'

	const parentRef = useRef<HTMLDivElement | null>(null)

	const [pageWidth, setPageWidth] = useState(1000)
	const [totalPages, setTotalPages] = useState<number>()

	/** For handle resize of pdf according to parent. */
	useEffect(() => {
		const updatePageWidth = () => {
			if (parentRef.current) {
				const parentWidth = parentRef.current.offsetWidth
				setPageWidth(parentWidth)
			}
		}

		window.addEventListener('resize', updatePageWidth)
		updatePageWidth()

		return () => {
			window.removeEventListener('resize', updatePageWidth)
		}
	}, [])

	const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
		setTotalPages(numPages)
	}

	return (
		<main className="container xl:flex gap-8 py-6">
			<div ref={parentRef} className="w-full xl:w-3/4">
				<Document file={pdfUrl} loading={<div style={{ width: pageWidth }} className="h-[600px] bg-gray-200 animate-pulse" />} onLoadSuccess={onDocumentLoadSuccess}>
					<Page loading={<div style={{ width: pageWidth }} className="h-[600px] bg-white" />} pageNumber={Number(page)} width={pageWidth} className="border border-gray-400" />
				</Document>

				<div className="flex justify-center mt-4">
					<Pagination
						color="primary"
						count={totalPages}
						page={Number(page)}
						onChange={(_, number) => {
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
