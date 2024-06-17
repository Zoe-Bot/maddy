'use client'
import { usePathname, useSearchParams } from 'next/navigation'
import NProgress from 'nprogress'
import { useEffect } from 'react'

export const NavigationEvents: React.FC = () => {
	const pathname = usePathname()
	const searchParams = useSearchParams()

	useEffect(() => {
		// Clear the progress bar when the component is mounted for router push
		NProgress.done()
	}, [pathname, searchParams])

	return null
}
