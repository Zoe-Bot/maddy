type LabelProps = {
	/** The unique input name */
	name: string
	/** Inform users what the corresponding input fields mean. */
	children: string
	/** When set Required * will be seen  */
	labelRequired?: boolean
}

/**
 * Label for Inputs
 * @example <Label labelText="Name" labelRequired={true} />
 */
export const Label: React.FC<LabelProps> = ({ name, children, labelRequired = false }) => (
	<>
		<label htmlFor={name} className="block text-gray-700 text-sm mb-1">
			{children}
			{labelRequired && <span className="text-primary-600 ml-1">*</span>}
		</label>
	</>
)
