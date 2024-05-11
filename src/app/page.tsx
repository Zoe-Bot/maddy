import { PrismaClient } from '@prisma/client'
import Link from 'next/link'
import { routes } from '../services/routes'

export const prisma = new PrismaClient()

export default async function SlidesOverview() {
	return (
		<main className="container py-6">
			<h1 className="font-bold">Foliensatzübersicht</h1>

			<ul>
				<li>
					<Link href={routes.slideDecks.single('1')}>Link zu Foliensatz 1</Link>
				</li>
				<li>
					<Link href={routes.slideDecks.single('2')}>Link zu Foliensatz 2</Link>
				</li>
			</ul>
		</main>
	)
}
