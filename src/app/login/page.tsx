'use client'
import { ArrowRightEndOnRectangleIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { Field, FieldProps, Form, Formik } from 'formik'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '../../components/button/Button'
import { FormError } from '../../components/errors/FormError'
import { login } from '../../services/auth'
import { routes } from '../../services/routes'

export default function LoginPage() {
	const [isLoading, setIsLoading] = useState(false)
	const [showPassword, setShowPassword] = useState(false)
	const initialValues = {
		password: '',
	}

	return (
		<main className="container flex items-center flex-col my-auto w-full sm:w-2/3 lg:w-1/3 py-6">
			<div className="flex items-center justify-center bg-primary-500 rounded-full w-16 h-16 mb-4">
				<ArrowRightEndOnRectangleIcon className="text-white w-6 h-6" />
			</div>
			<h1 className="font-bold text-center text-xl md:text-2xl">Login für Dozenten und Professoren</h1>
			<p className="text-center text-gray-500 mb-4 sm:mb-10">Melden Sie sich an um die Foliensätze zu verwalten und Statistiken einzusehen. Für Professoren und Dozenten.</p>

			<Formik
				initialValues={initialValues}
				onSubmit={async (values, helper) => {
					setIsLoading(true)
					const error = await login(values.password)

					if (error) {
						helper.setFieldError('password', error)
						setIsLoading(false)
					}
				}}
			>
				<Form className="w-full">
					<Field name="password">
						{({ field, form }: FieldProps) => (
							<div className="w-full mb-2 md:mb-4">
								<TextField
									{...field}
									type={showPassword ? 'text' : 'password'}
									label="Passwort"
									variant="filled"
									className="[&_.MuiFilledInput-root]:bg-gray-100 [&_.MuiFormLabel-root]:text-gray-400"
									fullWidth
									error={Boolean(form.errors.password)}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton onClick={() => setShowPassword((showPassword) => !showPassword)}>
													{showPassword ? <EyeIcon className="w-5 h-5" /> : <EyeSlashIcon className="w-5 h-5" />}
												</IconButton>
											</InputAdornment>
										),
									}}
								/>
								<FormError field="password" />
							</div>
						)}
					</Field>

					<div className="flex flex-col gap-3">
						<Button loading={isLoading} Icon={ArrowRightEndOnRectangleIcon} type="submit">
							Anmelden
						</Button>
						<Link className="text-center text-gray-500 hover:text-gray-600" href={routes.slideDecks.overview}>
							Zurück zur Übersicht
						</Link>
					</div>
				</Form>
			</Formik>
		</main>
	)
}
