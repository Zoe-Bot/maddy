'use client'
import { PlusIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { IconButton, Modal, TextField, TextareaAutosize } from '@mui/material'
import { Field, FieldProps, Form, Formik } from 'formik'
import * as yup from 'yup'
import { addSlideDeck } from '../../services/image'
import { Button } from '../button/Button'
import { FormError } from '../errors/FormError'
import { FileUpload } from '../form/FileUpload'
import { Label } from '../form/Label'

type Props = {
	isModalOpen: boolean
	onClose: () => void
}

export type SlideDeckDto = {
	pdf: File | null
	name: string
	description?: string
}

export const AddEditSlideModal: React.FC<Props> = ({ isModalOpen, onClose }) => {
	const initialValues: SlideDeckDto = {
		pdf: null,
		name: '',
		description: '',
	}

	const validationSchema = yup.object().shape({
		name: yup.string().min(3, 'Name muss mindestens 3 Zeichen haben.').required('Name ist erforderlich.'),
		image: yup.string().required('Pdf ist erforderlich.'),
	})

	return (
		<Modal open={isModalOpen} onClose={onClose}>
			<div className="bg-white flex flex-col absolute top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 w-[90vw] md:w-[600px] overflow-hidden rounded-2xl p-6 md:p-10">
				<div className="flex justify-between items-center mb-2 md:mb-4">
					<h2 className="font-bold text-xl md:text-2xl">Foliensatz hinzufügen</h2>
					<IconButton onClick={onClose}>
						<XMarkIcon className="w-6 h-6 fill-black" />
					</IconButton>
				</div>

				<Formik
					initialValues={initialValues}
					onSubmit={(values) => {
						console.log(values)

						addSlideDeck(JSON.parse(JSON.stringify(values)))
						onClose()
					}}
					validationSchema={validationSchema}
				>
					{(formik) => (
						<Form>
							<div>
								<Label name="pdf">Foliensatz Pdf Datei</Label>
								<FileUpload name="pdf" file={formik.values.pdf} />

								<Label name="name">Name</Label>
								<Field name="name">
									{({ field, form }: FieldProps) => (
										<div className="mb-2 md:mb-4">
											<TextField {...field} label="Name" variant="filled" className="[&_.MuiFilledInput-root]:bg-gray-100" fullWidth error={form.touched.name && Boolean(form.errors.name)} />
											<FormError field="name" />
										</div>
									)}
								</Field>

								<Label name="description">Beschreibung</Label>
								<Field name="description">
									{({ field }: FieldProps) => (
										<TextareaAutosize
											{...field}
											placeholder="Kurze Beschreibung zum Inhalt des Foliensatzes"
											className="placeholder:text-sm bg-gray-100 rounded-md px-3 py-2 resize-none w-full mb-2 md:mb-4"
											minRows={3}
										/>
									)}
								</Field>

								<div className="flex flex-col md:flex-row justify-between">
									<Button kind="tertiary" onClick={() => formik.resetForm()} type="button" className="text-primary-500 hover:bg-transparent hover:text-primary-600 normal-case rounded-none py-2">
										Zurücksetzen
									</Button>

									<Button
										type="submit"
										disabled={!formik.isValid || formik.isSubmitting}
										Icon={PlusIcon}
										className="bg-primary-500 hover:bg-primary-600 disabled:bg-opacity-70 disabled:text-white disabled:text-opacity-70 text-white normal-case rounded-none px-5 py-2"
									>
										Foliensatz hinzufügen
									</Button>
								</div>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</Modal>
	)
}
