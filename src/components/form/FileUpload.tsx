import { DocumentIcon } from '@heroicons/react/20/solid'
import { Slideset } from '@prisma/client'
import { Field, FieldProps } from 'formik'
import { useRef, useState } from 'react'
import { Button } from '../button/Button'
import { FormError } from '../errors/FormError'

type Props = {
	name: string
	file: File | null
	slideset?: Slideset
	setHasFileEdited: any
}

export const FileUpload: React.FC<Props> = ({ name, file, slideset, setHasFileEdited }) => {
	const [uploadedFile, setUploadedFile] = useState<File | null>(file)
	const [editFile, setEditFile] = useState<Slideset | null>(slideset ?? null)
	const [dragActive, setDragActive] = useState(false)

	// Refs
	const inputRef = useRef<HTMLInputElement>(null)

	/**
	 * Handles the pdf.
	 * @param files The files that were uploaded.
	 * @param formikProps helper
	 */
	const handlePdf = (files: FileList, formikProps: FieldProps<any>) => {
		formikProps.form.setFieldTouched(name, true, false)
		const file = files[0]
		if (!file) {
			return
		}

		// File size bigger than 4MB
		if (file.size > 4e6) {
			formikProps.form.setFieldError(name, 'File size is too big.')
			return
		}

		// File type not pdf
		if (file.type !== 'application/pdf') {
			formikProps.form.setFieldError(name, 'Only PDF files supported.')
			return
		}

		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onloadend = () => {
			setHasFileEdited(true)
			setUploadedFile(file)
			formikProps.form.setFieldValue(formikProps.field.name, file)
		}
	}

	/**
	 * Handles the drag event to set drag state correct.
	 * @param event The drag event.
	 * @param formikProps helper
	 */
	const handleDrag = (event: React.DragEvent<HTMLDivElement>) => {
		if (uploadedFile) return

		event.preventDefault()
		event.stopPropagation()

		if (event.type === 'dragenter' || event.type === 'dragover') {
			setDragActive(true)
		} else if (event.type === 'dragleave') {
			setDragActive(false)
		}
	}

	/**
	 * Handles pdf when got inserted by drag an drop.
	 * @param event The drop event.
	 * @param formikProps helper
	 */
	const handleDrop = (event: React.DragEvent<HTMLDivElement>, formikProps: FieldProps<any>) => {
		event.preventDefault()
		event.stopPropagation()
		setDragActive(false)

		if (event.dataTransfer.files && event.dataTransfer.files[0]) {
			handlePdf(event.dataTransfer.files, formikProps)
		}
	}

	/**
	 * Handles pdf when inserted via browse button.
	 * @param event The change event.
	 * @param formikProps helper
	 */
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>, formikProps: FieldProps<any>) => {
		event.preventDefault()
		event.stopPropagation()

		if (event.target.files && event.target.files[0]) {
			handlePdf(event.target.files, formikProps)
		}
	}

	/**
	 * Clear file from state and formik.
	 * @param formikProps helper
	 */
	const resetFile = (formikProps: FieldProps<any>) => {
		setHasFileEdited(null)
		setUploadedFile(null)
		setEditFile(null)
		formikProps.form.setFieldValue(formikProps.field.name, null)
	}

	return (
		<Field name={name}>
			{(props: FieldProps<any>) => (
				<>
					<div
						className={`mb-2 md:mb-4 relative transition duration-200 w-full h-44 border-2 border-dashed ${
							dragActive ? 'border-primary-600' : `${props.meta.error && props.meta.touched ? 'border-red-500' : 'border-gray-300'}`
						}`}
						onDragEnter={handleDrag}
					>
						{/* Upload Drag and Dropbox */}
						{!uploadedFile && !editFile && (
							<>
								{/* File upload */}
								<input className="hidden" id="input-file-upload" ref={inputRef} type="file" accept=".pdf" onChange={(event) => handleChange(event, props)} />

								{/* File upload content */}
								<label className="flex items-center justify-center text-gray-500 h-full cursor-pointer" htmlFor="input-file-upload">
									<DocumentIcon className={`w-16 h-16 text-5xl ${dragActive ? 'text-primary-600' : ''} mr-4`} />
									<div>
										<span className="font-medium text-gray-700 mr-1">PDF-Datei Drag and Drop oder</span>
										{/* Browse button */}
										<button type="button" onClick={() => inputRef.current?.click()} className="inline font-medium text-primary-600 hover:text-primary-700">
											Suchen
										</button>
										<p className="text-gray-500 text-sm">.pdf (max file size: 4MB)</p>
									</div>
								</label>

								{/* Drag Box */}
								{dragActive && (
									<div className="absolute inset-0 w-full h-full" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={(event) => handleDrop(event, props)}></div>
								)}
							</>
						)}

						{/* File set */}
						{(uploadedFile || editFile) && (
							<div className="flex flex-col items-center justify-center h-full">
								<DocumentIcon className="text-primary-600 h-10 w-10 mb-2" />
								<p className="text-gray-700 font-medium">{editFile ? editFile.name : uploadedFile?.name}</p>
								<Button kind="tertiary" onClick={() => resetFile(props)}>
									Entfernen
								</Button>
							</div>
						)}
					</div>
					{props.meta.error && props.meta.touched && (
						<div className="mb-3">
							<FormError field={name} />
						</div>
					)}
				</>
			)}
		</Field>
	)
}
