import { ExclamationCircleIcon } from '@heroicons/react/20/solid'
import { ErrorMessage } from 'formik'

export type FormErrorProps = {
	/** unique name of formik field */
	field: string
}

/**
 * Errormessage for inputs, can only be used with formik.
 * @example <FormError field="email" />
 */
export const FormError: React.FunctionComponent<FormErrorProps> = ({ field }) => {
	return (
		<ErrorMessage name={field}>
			{(errorMessage) => (
				<div className="flex items-center text-red-500 mt-2">
					<ExclamationCircleIcon className="w-5 h-5 mr-1" />
					<span className="font-medium text-sm">{errorMessage}</span>
				</div>
			)}
		</ErrorMessage>
	)
}
