import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { useUserService } from '@/contexts/index.ts';
import useNotice from '@/features/notification/use-notice.hook';
import { UserDataToServer } from '@/features/users/model';

const useUserEdit = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const userService = useUserService();
	const { notify } = useNotice();

	const { mutate: editUserInfo, isPending: isUpdating } = useMutation({
		mutationFn: async ({ id, data }: { id: number; data: UserDataToServer }) =>
			await userService.editUser(id, data),
		onSuccess: () => {
			notify('개인 정보가 업데이트 되었습니다.');
			queryClient.invalidateQueries({ queryKey: ['user'] });

			navigate(`/user`, { replace: true });
		},
		onError: error => {
			console.error(error.message);
		},
	});

	return { editUserInfo, isUpdating };
};

export default useUserEdit;
