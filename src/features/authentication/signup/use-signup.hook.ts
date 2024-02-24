import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { useAuthService } from '@/contexts/index.ts';
import { SignData } from '@/features/authentication/_lib/model.ts';
import useNotice from '@/hooks/use-notice.ts';

const useSignup = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const authService = useAuthService();
	const { notify } = useNotice();

	const {
		mutate: signup,
		isPending,
		isError,
		error,
	} = useMutation({
		mutationFn: async (user: SignData) => await authService.signup(user),
		onSuccess: data => {
			notify('회원가입이 완료 되었습니다.');
			queryClient.setQueryData(['user'], data.user);
			queryClient.setQueryData(['user', 'session'], data.session);
			// user 쿼리, user session 쿼리 캐시 갱신
			navigate('/', { replace: true });
		},
		onError: error => {
			console.error(error);
		},
	});

	return { signup, isPending, isError, error };
};

export default useSignup;
