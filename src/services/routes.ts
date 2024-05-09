export const routes = {
	slideDecks: {
		overview: '/',
		single: (id: string) => `/${id}`,
		statistics: (id: string) => `/${id}/statistics`,
	},
	login: '/login',
	statistics: '/statistics',
}
