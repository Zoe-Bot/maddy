export const routes = {
	slideDecks: {
		overview: '/',
		single: (id: number, page?: number) => {
			if (!page) {
				return `/${id}?page=1`
			}

			return `/${id}?page=${page}`
		},
	},
	admin: {
		slideDecks: {
			overview: '/admin',
			single: (id: number, page?: number) => {
				if (!page) {
					return `/admin/${id}?page=1`
				}

				return `/admin/${id}?page=${page}`
			},
			statistics: (id: number) => `/admin/${id}/statistics`,
		},
		statistics: '/admin/statistics',
	},
	login: '/login',
}
