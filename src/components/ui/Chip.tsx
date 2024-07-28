import React from 'react'

type Props = {
	children: React.ReactNode
	color: 'primary' | 'red' | 'green'
}

export const Chip: React.FC<Props> = ({ children, color }) => {
	const primary = `text-primary-500 bg-primary-600`
	const red = `text-red-500 bg-red-500`
	const green = `text-green-500 bg-green-500`

	return (
		<span
			className={`${color === 'primary' ? primary : ''} ${color === 'red' ? red : ''} ${color === 'green' ? `${green} pr-2` : ''} inline-flex items-center text-sm font-bold bg-opacity-15 rounded-lg px-3 py-1`}
		>
			{children}
		</span>
	)
}
