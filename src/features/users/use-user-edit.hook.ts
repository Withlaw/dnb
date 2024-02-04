import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { useUserService } from '@/contexts/index.ts';
import useNotice from '@/features/notification/use-notice.hook.ts';
import {
	UserDataFromServer,
	UserDataToServer,
} from '@/features/users/model.ts';

const useUserEdit = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const userService = useUserService();
	const { notify } = useNotice();

	const { mutate: editUserInfo, isPending: isUpdating } = useMutation({
		mutationFn: async ({ id, data }: { id: number; data: UserDataToServer }) =>
			await userService.editUser(id, data),
		onMutate: async ({ data }) => {
			await queryClient.cancelQueries({ queryKey: ['user'] });
			// 해당 쿼리의 활성을 취소함. 낙관적으로 업데이트된 쿼리 캐시 데이터와 실제 응답 데이터가 충돌하지 않도록 함.

			const newUserData = new UserDataFromServer(data);
			const previousUserData = queryClient.getQueryData<UserDataFromServer>([
				'user',
			]);
			if (!previousUserData) {
				notify('문제가 발생하였습니다. 다시 시도해주세요.', { type: 'error' });
				navigate('../');
				throw new Error('User info update is failed.');
			}

			queryClient.setQueryData(['user'], (oldUserData: UserDataFromServer) => {
				return { ...oldUserData, ...newUserData };
			});
			// 쿼리키의 캐시 데이터를 직접 업데이트 함.

			return { previousUserData };
			// onMutate가 반환하는 객체는, mutate가 이행되었을때 실행되는 콜백함수의 context매개변수의 인자로 전달된다.
		},
		onSuccess: () => {
			notify('개인 정보가 업데이트 되었습니다.');
		},
		onError: (error, _, context) => {
			console.error(error.message);
			if (!context?.previousUserData) return;

			queryClient.setQueryData(['user'], context.previousUserData);
			// mutate가 실패하는 경우, 낙관적 업데이트를 롤백함.
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['user'] });
			// 혹시 롤백된 쿼리 데이터가 백엔드의 최신데이터와 다를 수 있으니 동기화시켜준다.

			navigate(`/user`, { replace: true });
		},
	});

	return { editUserInfo, isUpdating };
};

export default useUserEdit;
