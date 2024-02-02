import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { useAuthService } from '@/contexts/index.ts';
import { SignData } from '@/features/authentication/model.ts';

const useLogin = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const authService = useAuthService();

	const {
		mutate: login,
		isPending: isLoading,
		isError,
		error,
	} = useMutation({
		mutationFn: async ({ email, password }: SignData) =>
			await authService.signin({ email, password }),
		onSuccess: data => {
			queryClient.setQueryData(['user'], data.user);
			queryClient.setQueryData(['user', 'session'], data.session);
			// user 쿼리, user session 쿼리 캐시 갱신
			navigate('/', { replace: true });
		},
		onError: error => {
			console.error('useLogin error: ', error);
		},
	});

	return { login, isLoading, isError, error };
};

export default useLogin;
