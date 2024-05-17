'use client'
import { PlusIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import { Button } from '../../components/button/Button'
import { AddEditSlideModal } from '../../components/modal/AddEditSlideModal'

export default function SlideOverview() {
	const [isModalOpen, setIsModalOpen] = useState(false)

	return (
		<main className="container py-6">
			<div className="flex items-center justify-between">
				<h1 className="text-xl md:text-3xl font-bold">Foliensatz Übersicht</h1>

				<Button Icon={PlusIcon} onClick={() => setIsModalOpen(true)} className="bg-primary-600 hover:bg-primary-700 focus:bg-primary-800 text-white font-semibold py-3 px-7 rounded-lg">
					Foliensatz hinzufügen
				</Button>
			</div>

			{isModalOpen && <AddEditSlideModal isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
		</main>
	)
}
