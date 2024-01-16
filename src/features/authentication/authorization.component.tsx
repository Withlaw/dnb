import { useEffect } from 'react';
import { RouteObject, useNavigate } from 'react-router-dom';

import useUserSession from '@/features/users/use-user-session.hook.ts';

type Props = {
	children: React.ReactNode;
	route: RouteObject;
};

const Authorization = ({ children, route }: Partial<Props>) => {
	const navigate = useNavigate();
	const { isLogin, isFetching } = useUserSession();

	const isGuestOnlyPage = route?.id === 'guest-only';
	const isProtectedPage = route?.id === 'protected';

	useEffect(() => {
		if (isGuestOnlyPage && !isFetching && isLogin)
			navigate('/', { replace: true });
		if (isProtectedPage && !isFetching && !isLogin)
			navigate('/sign-in', { replace: true });
	}, [isLogin, isFetching, route]);

	if (isFetching) return null;

	return children;
};

export default Authorization;
