import { Slideset } from '@prisma/client'
import { PDFDocument } from 'pdf-lib'
import { getSlidesetPagesWithFeedback } from './slideSet'

export async function handleExport(slideset: Slideset) {
	try {
		// Get the pages with feedback for the slideset
		const pagesWithFeedback = await getSlidesetPagesWithFeedback(slideset.id)
		const pagesIndex = pagesWithFeedback.map((page) => page - 1)

		// Fetch the PDF file
		const response = await fetch(slideset.pdfUrl)
		const pdfBytes = await response.arrayBuffer()

		// Load the PDF document
		const pdfDoc = await PDFDocument.load(pdfBytes)

		// Create a new PDF document
		const newPdfDoc = await PDFDocument.create()

		// Copy the pages you want to extract from the original PDF
		const copiedPages = await newPdfDoc.copyPages(pdfDoc, pagesIndex)

		// Add the extracted pages to the new PDF document
		copiedPages.forEach((page) => {
			console.log(page)
			return newPdfDoc.addPage(page)
		})

		// Save the new PDF document to a Uint8Array
		const newPdfBytes = await newPdfDoc.save()

		// Create a download link and trigger the download
		const blob = new Blob([newPdfBytes], { type: 'application/pdf' })
		const url = window.URL.createObjectURL(blob)
		const link = document.createElement('a')
		link.href = url
		const name = slideset.name
			.replaceAll(' ', '_')
			.replaceAll('.', '')
			.replace(/[\/\\:*?"<>|]/g, '')
			.toLocaleLowerCase()
		link.setAttribute('download', `${name}_onlyproblems.pdf`)
		document.body.appendChild(link)
		link.click()
	} catch (error) {
		console.error('Error exporting PDF:', error)
	}
}
