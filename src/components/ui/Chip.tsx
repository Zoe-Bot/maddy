import React from 'react'

type Props = {
	children: React.ReactNode
	color: 'primary' | 'red'
}

export const Chip: React.FC<Props> = ({ children, color }) => {
	const primary = `text-primary-500 bg-primary-600`
	const red = `text-red-500 bg-red-500`

	return <span className={`${color === 'primary' ? primary : ''} ${color === 'red' ? red : ''} text-sm font-bold bg-opacity-15 rounded-lg px-3 py-1`}>{children}</span>
}
