'use client'
import { PlusIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { IconButton, Modal } from '@mui/material'
import { Form, Formik } from 'formik'
import * as yup from 'yup'
import { addSlideDeck } from '../../services/image'
import { Button } from '../button/Button'

type Props = {
	isModalOpen: boolean
	onClose: () => void
}

export type SlideDeckDto = {
	image: File | null
	name: string
	description?: string
}

export const AddEditSlideModal: React.FC<Props> = ({ isModalOpen, onClose }) => {
	const initialValues: SlideDeckDto = {
		image: null,
		name: '',
		description: '',
	}

	const validationSchema = yup.object().shape({
		image: yup.string().required('Image is required'),
	})

	return (
		<Modal open={isModalOpen} onClose={onClose}>
			<div className="bg-white flex flex-col absolute top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 w-full md:w-[800px] h-full md:h-[90vh] overflow-hidden rounded-2xl py-10 px-10">
				<div className="flex justify-between items-center">
					<h2 className="font-bold text-xl md:text:2xl">Foliensatz hinzufügen</h2>
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
				>
					{(formik) => (
						<Form className="h-[calc(100%-61px)]">
							<div className="px-6 h-[calc(100%-100px)] md:h-[calc(100%-70px)] overflow-auto">
								<label htmlFor="image">Image</label>
								<input
									id="file"
									name="file"
									type="file"
									onChange={(event) => {
										if (!event.currentTarget.files) return
										formik.setFieldValue('image', event.currentTarget.files[0])
									}}
								/>
								<div className="flex flex-col md:flex-row justify-between">
									<Button kind="tertiary" onClick={() => formik.resetForm()} type="button" className="text-primary-500 hover:bg-transparent hover:text-primary-600 normal-case rounded-none py-2">
										Eingaben zurücksetzen
									</Button>

									<Button
										type="submit"
										// disabled={!formik.isValid || formik.isSubmitting}
										Icon={PlusIcon}
										className="bg-primary-500 hover:bg-primary-600  disabled:bg-opacity-70 disabled:text-white disabled:text-opacity-70 text-white normal-case rounded-none px-5 py-2"
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
