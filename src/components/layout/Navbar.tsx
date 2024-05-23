import { Bars3Icon } from '@heroicons/react/20/solid'
import { IconButton } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { routes } from '../../services/routes'

type NavLink = {
	shouldDisplay: boolean
	to?: string
	onClick?: () => void
	text: string
}

export const Navbar: React.FC = () => {
	const router = useRouter()

	// Local States
	const [isNavMobileOpen, setIsNavMobileOpen] = useState<boolean>(false)

	const navLinks: NavLink[] = [
		{
			shouldDisplay: true,
			to: routes.login,
			text: 'Anmelden als Dozent',
		},
		{
			shouldDisplay: false,
			to: routes.admin.statistics,
			text: 'Statistiken',
		},
		{
			shouldDisplay: false,
			onClick: () => '',
			text: 'Abmelden',
		},
	]

	return (
		<nav className="border-t-8 border-primary-600 py-4">
			<div className="container md:flex items-center gap-6">
				<div className="flex items-center justify-between w-full md:w-auto mb-2 md:mb-0">
					<h1 className="font-bold text-primary-600 text-xl">
						<Link href={routes.slideDecks.overview}>Maddy</Link>
					</h1>

					{/* Mobile menu button */}
					<IconButton className="block md:hidden" onClick={() => setIsNavMobileOpen((isNavMobileOpen) => !isNavMobileOpen)}>
						<Bars3Icon className="w-5 h-5" />
					</IconButton>
				</div>

				<ul className={`${isNavMobileOpen ? 'block' : 'hidden'} md:flex items-center gap-4 w-full space-y-2 md:space-y-0`}>
					<li className="mr-auto">
						<Link href={routes.slideDecks.overview}>Übersicht</Link>
					</li>
					{navLinks.map(
						(link) => link.shouldDisplay && <li key={link.text}>{link.to ? <Link href={link.to ? link.to : '#'}>{link.text}</Link> : <button onClick={link.onClick}>{link.text}</button>}</li>,
					)}
				</ul>
			</div>
		</nav>
	)
}
