import { useEffect } from 'react';
import { RouteObject, useNavigate } from 'react-router-dom';

import useUserSession from '@/features/authentication/use-user-session.hook.ts';

type Props = {
	children: React.ReactNode;
	route: RouteObject;
};

const Authorization = ({ children, route }: Partial<Props>) => {
	const navigate = useNavigate();
	const { isLogin, isFetching } = useUserSession();
	// const { isAuthenticated } = useUser();

	console.log('Authorization');

	const isGuestOnlyPage = route?.id === 'guest-only';
	const isProtectedPage = route?.id === 'protected';

	useEffect(() => {
		if (isGuestOnlyPage && !isFetching && isLogin)
			navigate('/', { replace: true });
		if (isProtectedPage && !isFetching && !isLogin)
			navigate('/sign-in', { replace: true });

		console.log('Authorization effect');
	}, [isLogin, isFetching, route]);

	// if (isHomePage) return children;
	// if (isGuestOnlyPage && !isLogin) return children;
	// if (isProtectedPage && isLogin) return children;

	if (isFetching) return null;

	return children;
};

export default Authorization;
