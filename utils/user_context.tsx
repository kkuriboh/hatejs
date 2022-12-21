import { createContext, Dispatch, SetStateAction, useState } from 'react'

export type User = {
	id: string
	name: string
	status: 'GM' | 'NORMAL'
}

type UserContextType = [User, Dispatch<SetStateAction<User>>]

const UserContext = createContext<UserContextType>([] as any)

type props = {
	children: React.ReactNode
}

const UserContextProvider: React.FC<props> = ({ children }) => {
	return (
		<UserContext.Provider
			value={useState<User>({
				id: '',
				name: '',
				status: 'NORMAL',
			})}
		>
			{children}
		</UserContext.Provider>
	)
}

export default UserContextProvider
