'use client'
import { Pagination } from '@mui/material'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { routes } from '../../services/routes'

type Props = {
	children: React.ReactNode
	pdfUrl: string
	page: string
	id: string
}

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString()

const SinglePagePdfRender: React.FC<Props> = ({ pdfUrl, children }) => {
	const router = useRouter()
	const params = useParams()
	const searchParams = useSearchParams()

	const id = params.id
	const page = searchParams.get('page') || '1'

	const parentRef = useRef<HTMLDivElement | null>(null)

	const [pageWidth, setPageWidth] = useState(1000)
	const [totalPages, setTotalPages] = useState<number>()

	useEffect(() => {
		const handleResize = () => {
			if (parentRef.current) {
				const parentWidth = parentRef.current.offsetWidth
				setPageWidth(parentWidth)
			}
		}

		window.addEventListener('resize', handleResize)
		handleResize()

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
		setTotalPages(numPages)
	}

	return (
		<main className="container xl:flex gap-8 py-6">
			<div ref={parentRef} className="w-full xl:w-3/4">
				<Document
					file={pdfUrl}
					onLoadProgress={() => console.log('Load process')}
					loading={<div style={{ width: pageWidth }} className="h-[600px] bg-gray-200 animate-pulse"></div>}
					onLoadSuccess={onDocumentLoadSuccess}
				>
					<Page loading={<div style={{ width: pageWidth }} className="h-[600px] bg-white"></div>} pageNumber={Number(page)} width={pageWidth} className="border border-gray-400" />
				</Document>

				<div className="flex justify-center mt-4">
					<Pagination
						color="primary"
						count={totalPages}
						page={Number(page)}
						onChange={(_, number) => {
							router.push(routes.slideDecks.single(Number(id), number))
						}}
					/>
				</div>
			</div>

			<div className="w-full lg:w-1/2 xl:w-1/4">{children}</div>
		</main>
	)
}

export default SinglePagePdfRender
