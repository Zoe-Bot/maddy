import { v4 as uuidv4 } from 'uuid'

export const createUserId = (): string => {
	const userId = uuidv4()
	localStorage.setItem('userId', userId)
	return userId
}

export const getUserId = (): string => {
	const userID = localStorage.getItem('userId')

	if (!userID) {
		const newUserId = createUserId()
		return newUserId
	}
	return userID
}
