'use client'
import { PlusIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import { Button } from '../../button/Button'
import { AddEditSlideModal } from '../../modal/AddEditSlideModal'

export const AdminSlideSetOverviewHeader: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)

	return (
		<div className="mb-3 md:mb-6">
			<div className="flex items-center justify-between">
				<h1 className="font-bold text-xl md:text-3xl">Foliensatzübersicht</h1>

				<Button Icon={PlusIcon} onClick={() => setIsModalOpen(true)} className="bg-primary-600 hover:bg-primary-700 focus:bg-primary-800 text-white font-semibold py-3 px-7 rounded-lg">
					Foliensatz hinzufügen
				</Button>
			</div>

			{isModalOpen && <AddEditSlideModal isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
		</div>
	)
}
