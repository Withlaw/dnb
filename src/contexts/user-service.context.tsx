import { createContext } from 'react';

import { UserServiceInterface } from '@/services/user-service.ts';

type UserServiceContextType = {
	userService: UserServiceInterface;
};

export const UserServiceContext = createContext<UserServiceContextType | null>(
	null,
);

export default function UserServiceProvider({
	children,
	userService,
}: {
	children: React.ReactNode;
	userService: UserServiceInterface;
}) {
	return (
		<UserServiceContext.Provider value={{ userService }}>
			{children}
		</UserServiceContext.Provider>
	);
}
