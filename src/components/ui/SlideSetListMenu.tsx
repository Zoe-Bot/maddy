'use client'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { Divider, IconButton, Menu, MenuItem } from '@mui/material'
import { Slideset } from '@prisma/client'
import Link from 'next/link'
import { useState } from 'react'
import { routes } from '../../services/routes'
import { DeleteModal } from '../modal/DeleteModal'

type Props = {
	slideSet: Slideset
}

export const SlideSetListMenu: React.FC<Props> = ({ slideSet }) => {
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
	const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null)
	const isOpen = Boolean(anchorElement)

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElement(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorElement(null)
	}

	return (
		<div className="w-min mx-3">
			<IconButton onClick={handleClick} aria-controls={isOpen ? 'account-menu' : undefined} aria-haspopup="true" aria-expanded={isOpen ? 'true' : undefined}>
				<EllipsisVerticalIcon className="w-6 h-6 text-gray-400" />
			</IconButton>

			{isDeleteModalOpen && <DeleteModal slideSet={slideSet} isModalOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} />}

			<Menu
				anchorEl={anchorElement}
				id="menu"
				open={isOpen}
				onClose={handleClose}
				onClick={handleClose}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
				className="[&_.MuiMenu-paper]:shadow-none [&_.MuiMenu-paper]:bg-gray-100 [&_.MuiMenu-paper]:text-gray-500"
			>
				<MenuItem className="hover:bg-gray-200 px-6 mt-2">
					<Link href={routes.admin.slideDecks.single(slideSet.id)} className="w-full">
						Anzeigen
					</Link>
				</MenuItem>
				<MenuItem className="hover:bg-gray-200 px-6" onClick={handleClose}>
					<Link href={routes.admin.slideDecks.statistics(slideSet.id)} className="w-full">
						Statistiken
					</Link>
				</MenuItem>
				<MenuItem className="hover:bg-gray-200 px-6" onClick={handleClose}>
					PDF exportieren (Probleme)
				</MenuItem>
				<MenuItem className="hover:bg-gray-200 px-6" onClick={handleClose}>
					Bearbeiten
				</MenuItem>
				<Divider className="mx-4" />
				<MenuItem
					className="hover:bg-gray-200 text-red-500 px-6 mb-2"
					onClick={() => {
						setIsDeleteModalOpen(true)
					}}
				>
					Löschen
				</MenuItem>
			</Menu>
		</div>
	)
}
