import { v4 as uuidv4 } from 'uuid'

export const createUserId = (): string => {
	if (typeof window === 'undefined') {
		return ''
	}

	const userId = uuidv4()
	localStorage.setItem('userId', userId)
	return userId
}

export const getUserId = (): string => {
	if (typeof window === 'undefined') {
		return ''
	}

	const userID = localStorage.getItem('userId')

	if (!userID) {
		const newUserId = createUserId()
		return newUserId
	}
	return userID
}
