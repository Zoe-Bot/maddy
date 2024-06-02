import { ArrowPathIcon } from '@heroicons/react/20/solid'
import { ButtonBase } from '@mui/material'

type Props = {
	kind?: 'primary' | 'secondary' | 'tertiary'
	Icon?: React.ElementType
	children: React.ReactNode
	color?: 'primary' | 'red' | 'gray'
	loading?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button: React.FC<Props> = ({ Icon, children, kind = 'primary', color = 'primary', loading, ...props }) => {
	props.disabled = loading || props.disabled
	const twPrimaryClassNames = `border-2 border-solid border-${color}-600 hover:border-${color}-700 bg-${color}-600 hover:bg-${color}-700 text-white font-semibold py-3 px-7 rounded-lg`
	const twSecondaryClassNames = `border-2 border-solid border-${color}-600 hover:border-transparent hover:bg-${color}-700 text-${color}-600 hover:text-white font-semibold py-3 px-7 rounded-lg`
	const twTertiaryClassNames = `text-${color}-600 hover:text-${color}-700 focus:text-${color}-800 font-semibold px-2 py-2`

	return (
		<ButtonBase
			{...props}
			disableRipple
			className={`${kind === 'primary' ? twPrimaryClassNames : ''} ${kind === 'secondary' ? twSecondaryClassNames : ''} ${kind === 'tertiary' ? twTertiaryClassNames : ''} disabled:opacity-70`}
		>
			{Icon && loading ? <ArrowPathIcon className="w-6 h-6 animate-spin mr-2" /> : Icon && <Icon className="w-6 h-6 mr-2" />}
			{children}
		</ButtonBase>
	)
}
