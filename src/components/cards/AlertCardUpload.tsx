'use client'
import { CheckIcon } from '@heroicons/react/16/solid'
import { Alert } from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'
import { routes } from '../../services/routes'

export const AlertCardUpload: React.FC = () => {
	const router = useRouter()
	const searchParams = useSearchParams()
	const action = searchParams.get('action')

	return (
		action === 'upload' && (
			<Alert className="text-green-900 my-4" icon={<CheckIcon className="size-5" />} onClose={() => router.replace(routes.admin.slideDecks.overview)} severity="success">
				Erstellung erfolgreich. Nachdem der Foliensatz verarbeitet wurde, wird er in der Übersicht angezeigt.
			</Alert>
		)
	)
}
