import { useMutation } from '@tanstack/react-query';

import { useAuthService } from '@/contexts/index.ts';

const useOauthWith = (provider: 'github') => {
	const authService = useAuthService();

	const {
		mutate: login,
		isPending: isLoading,
		isError,
		error,
	} = useMutation({
		mutationFn: async () => await authService.signinWith(provider),
		onSuccess: async () => {},
		onError: error => {
			console.error('useOauthWith error: ', error);
		},
	});

	return { login, isLoading, isError, error };
};

export default useOauthWith;
