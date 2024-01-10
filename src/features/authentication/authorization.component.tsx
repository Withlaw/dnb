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

	useEffect(() => {
		if (route?.id === 'guest-only' && isLogin) navigate('/', { replace: true });
		if (route?.id === 'protected' && !isLogin)
			navigate('/sign-in', { replace: true });
	}, [route, isLogin, navigate]);

	// if (isLoading) <h1>Loading...</h1>;

	return children;
};

export default Authorization;
