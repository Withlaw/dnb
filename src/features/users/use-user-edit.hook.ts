
import { useUserService } from "@/contexts/index.ts";
import { UserDataToServer } from "@/features/users/users.model.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const useUserEdit = () => {
  const navigate = useNavigate();
	const queryClient = useQueryClient();
  const userService = useUserService();

	const { mutate: editUserInfo, isPending: isUpdating } = useMutation({
		mutationFn: async ({id, data}:{id:number, data:UserDataToServer}) => await userService.editUser(id, data),
		onSuccess: () => {
			window.alert('New user info successfully updated.');
			queryClient.invalidateQueries({ queryKey: ['user'] });

			navigate(`/user`, { replace: true });
		},
		onError: error => {
			window.alert(error.message);
		},
	});

  return ( {editUserInfo, isUpdating} );
}

export default useUserEdit;
