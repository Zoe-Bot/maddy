'use server'
import { put } from '@vercel/blob'
import { SlideSetDto } from '../components/modal/AddEditSlideModal'
import { prisma } from './client'

export async function addSlideSet(newSlideSet: SlideSetDto) {
	// Upload the pdf file to the Blob Storage
	const blob = await put(newSlideSet.name, newSlideSet.pdf!, {
		access: 'public',
	})

	// Create a new slide deck in the database
	const slideDeck = await prisma.slideset.create({
		data: {
			name: newSlideSet.name,
			description: newSlideSet.description,
			pdfUrl: blob.url,
		},
	})

	console.info(`Slide set "${slideDeck.name}" added`)
}
