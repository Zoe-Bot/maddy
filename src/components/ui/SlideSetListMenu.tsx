'use client'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { Divider, IconButton, Menu, MenuItem } from '@mui/material'
import { useState } from 'react'

export const SlideSetListMenu: React.FC = () => {
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

			<Menu
				anchorEl={anchorElement}
				id="menu"
				open={isOpen}
				onClose={handleClose}
				onClick={handleClose}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			>
				<MenuItem onClick={handleClose}>Anzeigen</MenuItem>
				<MenuItem onClick={handleClose}>Statistiken</MenuItem>
				<MenuItem onClick={handleClose}>PDF exportieren (Probleme)</MenuItem>
				<MenuItem onClick={handleClose}>Bearbeiten</MenuItem>
				<Divider />
				<MenuItem onClick={handleClose}>Löschen</MenuItem>
			</Menu>
		</div>
	)
}
