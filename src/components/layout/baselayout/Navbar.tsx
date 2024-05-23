import Link from 'next/link'
import { routes } from '../../../services/routes'

export const Navbar: React.FC = () => {
	return (
		<nav className="container flex items-center gap-4 py-4">
			<h1>
				<Link href={routes.slideDecks.overview}>Maddy</Link>
			</h1>
			<ul className="flex gap-3 w-full">
				<li className="mr-auto">
					<Link href={routes.slideDecks.overview}>Übersicht</Link>
				</li>
				<li>
					<Link href={routes.login}>Anmelden als Dozent</Link>
				</li>
			</ul>
		</nav>
	)
}
