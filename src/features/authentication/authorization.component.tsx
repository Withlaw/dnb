import { useEffect } from 'react';
import { RouteObject, useNavigate } from 'react-router-dom';

import useUserSession from '@/features/authentication/use-user-session.hook.ts';

type Props = {
	children: React.ReactNode;
	route: RouteObject;
};

const Authorization = ({ children, route }: Partial<Props>) => {
	const navigate = useNavigate();
	const { isLogin } = useUserSession();

	useEffect(() => {
		if (route?.id === 'guest-only' && isLogin) navigate('/', { replace: true });
		if (route?.id === 'protected' && !isLogin)
			navigate('/sign-in', { replace: true });
	}, [route, isLogin, navigate]);

	return children;
};

export default Authorization;
