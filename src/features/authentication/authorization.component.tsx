import { useEffect } from 'react';
import { RouteObject, useNavigate } from 'react-router-dom';

import useUserSession from '@/features/authentication/use-user-session.hook.ts';

type Props = {
	children: React.ReactNode;
	route: RouteObject;
};

const Authorization = ({ children, route }: Partial<Props>) => {
	const navigate = useNavigate();
	const { isLogin, isLoading } = useUserSession();
	// const { isAuthenticated } = useUser();

	const isGuestOnlyPage = route?.id === 'guest-only';
	const isProtectedPage = route?.id === 'protected';

	useEffect(() => {
		if (isGuestOnlyPage && !isLoading && isLogin)
			navigate('/', { replace: true });
		if (isProtectedPage && !isLoading && !isLogin)
			navigate('/sign-in', { replace: true });
	}, [route, isLogin, navigate]);

	// if (isHomePage) return children;
	// if (isGuestOnlyPage && !isLogin) return children;
	// if (isProtectedPage && isLogin) return children;

	if (isLoading) return null;

	return children;
};

export default Authorization;
