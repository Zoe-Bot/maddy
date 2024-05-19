import { AdminSlideSetOverviewHeader } from '../../components/layout/header/AdminSlideSetOverviewHeader'
import { SlideSetList } from '../../components/layout/SlidesetList'

export default function SlideOverview() {
	return (
		<main className="container py-6">
			<AdminSlideSetOverviewHeader />

			<SlideSetList isAdmin />
		</main>
	)
}
