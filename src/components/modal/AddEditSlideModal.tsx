import { ArrowPathIcon, PlusIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { IconButton, Modal, TextField, TextareaAutosize } from '@mui/material'
import { Slideset } from '@prisma/client'
import { upload } from '@vercel/blob/client'
import { Field, FieldProps, Form, Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import * as yup from 'yup'
import { deletePdfFile, updateSlideset } from '../../services/slideSet'
import { Button } from '../button/Button'
import { FormError } from '../errors/FormError'
import { FileUpload } from '../form/FileUpload'
import { Label } from '../form/Label'

type Props = {
	isModalOpen: boolean
	onClose: () => void
	slideset?: Slideset
}

export type SlideSetDto = {
	pdf: File | null
	name: string
	description?: string
}

export const AddEditSlideModal: React.FC<Props> = ({ isModalOpen, onClose, slideset }) => {
	const router = useRouter()
	const isEditMode = Boolean(slideset)
	const [hasPdfFileEdited, setHasPdfFileEdited] = useState<boolean>(false)
	const initialValues: SlideSetDto = {
		pdf: null,
		name: slideset?.name ?? '',
		description: slideset?.description ?? '',
	}

	const validationSchema = yup.object().shape({
		name: yup.string().min(3, 'Name muss mindestens 3 Zeichen haben.').max(70, 'Name darf maximal 70 Zeichen haben.').required('Name ist erforderlich.'),
		...(isEditMode && hasPdfFileEdited && { pdf: yup.mixed().required('Pdf Datei ist erforderlich.') }),
		description: yup.string().max(500, 'Beschreibung darf maximal 500 Zeichen haben.'),
	})

	return (
		<Modal open={isModalOpen} onClose={onClose}>
			<div className="bg-white flex flex-col absolute top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 w-[90vw] md:w-[600px] overflow-hidden rounded-2xl p-6 md:p-10">
				<div className="flex justify-between items-center mb-2 md:mb-4">
					<h2 className="font-bold text-xl md:text-2xl">Foliensatz {isEditMode ? 'bearbeiten' : 'hinzufügen'}</h2>
					<IconButton onClick={onClose}>
						<XMarkIcon className="w-6 h-6 fill-black" />
					</IconButton>
				</div>

				<Formik
					initialValues={initialValues}
					onSubmit={async (values) => {
						if (isEditMode) {
							// Update with pdf
							if (values.pdf) {
								await upload(values.name, values.pdf!, {
									access: 'public',
									handleUploadUrl: '/api/slidesets/update',
									clientPayload: JSON.stringify({ id: slideset!.id, name: values.name, description: values.description }),
								})

								// Cleanup file
								await deletePdfFile(slideset!.pdfUrl)
							} else {
								// Update metadata
								await updateSlideset({
									id: slideset!.id,
									name: values.name,
									description: values.description,
								})
							}
						} else {
							// Create new slideset
							await upload(values.name, values.pdf!, {
								access: 'public',
								handleUploadUrl: '/api/slidesets/create',
								clientPayload: JSON.stringify({ name: values.name, description: values.description }),
							})
						}

						router.refresh()
						onClose()
					}}
					validationSchema={validationSchema}
				>
					{(formik) => (
						<Form>
							<div>
								<Label name="pdf">Foliensatz Pdf Datei</Label>
								<FileUpload name="pdf" file={formik.values.pdf} slideset={slideset} setHasFileEdited={setHasPdfFileEdited} />

								<Label name="name">Name</Label>
								<Field name="name">
									{({ field, form }: FieldProps) => (
										<div className="mb-2 md:mb-4">
											<TextField
												{...field}
												label="Name"
												variant="filled"
												className="[&_.MuiFilledInput-root]:bg-gray-100 [&_.MuiFormLabel-root]:text-gray-400"
												fullWidth
												error={form.touched.name && Boolean(form.errors.name)}
											/>
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
											className="bg-gray-100 rounded-md px-3 py-2 resize-none w-full mb-2 md:mb-4"
											minRows={3}
										/>
									)}
								</Field>

								<div className="flex flex-col md:flex-row justify-between">
									<Button kind="tertiary" onClick={() => formik.resetForm()} type="button">
										Zurücksetzen
									</Button>

									<Button type="submit" disabled={(isEditMode && formik.values.pdf ? false : !formik.isValid) || formik.isSubmitting} Icon={isEditMode ? ArrowPathIcon : PlusIcon}>
										Foliensatz {isEditMode ? 'bearbeiten' : 'hinzufügen'}
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
