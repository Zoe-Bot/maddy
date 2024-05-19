import { ButtonBase } from '@mui/material'

type Props = {
	kind?: 'primary' | 'secondary' | 'tertiary'
	Icon?: React.ElementType
	children: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button: React.FC<Props> = ({ Icon, children, kind = 'primary', ...props }) => {
	const twPrimaryClassNames = 'border-2 border-solid border-primary-600 hover:border-primary-700 bg-primary-600 hover:bg-primary-700 focus:bg-primary-800 text-white font-semibold py-3 px-7 rounded-lg'
	const twSecondaryClassNames =
		'border-2 border-solid border-primary-600 hover:border-transparent focus:border-transparent hover:bg-primary-700 focus:bg-primary-800 text-primary-600 hover:text-white focus:text-white font-semibold py-3 px-7 rounded-lg'
	const twTertiaryClassNames = 'text-primary-600 hover:text-primary-700 focus:text-primary-800 font-semibold px-2 py-2'

	return (
		<ButtonBase
			{...props}
			disableRipple
			className={`${kind === 'primary' ? twPrimaryClassNames : ''} ${kind === 'secondary' ? twSecondaryClassNames : ''} ${kind === 'tertiary' ? twTertiaryClassNames : ''} disabled:opacity-70`}
		>
			{Icon && <Icon className="w-6 h-6 mr-2" />}
			{children}
		</ButtonBase>
	)
}
