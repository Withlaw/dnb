import { createContext } from 'react';

import { AuthServiceInterface } from '@/services/auth-service.ts';

type AuthServiceContextType = {
	authService: AuthServiceInterface;
};

export const AuthServiceContext = createContext<AuthServiceContextType | null>(
	null,
);

export default function AuthServiceProvider({
	children,
	authService,
}: {
	children: React.ReactNode;
	authService: AuthServiceInterface;
}) {
	return (
		<AuthServiceContext.Provider value={{ authService }}>
			{children}
		</AuthServiceContext.Provider>
	);
}
