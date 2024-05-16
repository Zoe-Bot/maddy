'use server'
import { put } from '@vercel/blob'
import { SlideDeckDto } from '../components/modal/AddEditSlideModal'

export async function addSlideDeck(newSlideDeck: SlideDeckDto) {
	const imageFile = newSlideDeck.image as File
	const blob = await put('test', imageFile, {
		access: 'public',
	})
	console.info('Image uploaded')

	// Add to database
}
