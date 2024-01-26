import { addNotice, deleteNotice } from '@/features/notification/slice.ts';
import { Notify } from '@/features/notification/types.ts';
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux.tsx';

const useNotice = () => {
	const dispatch = useAppDispatch();
	const notices = useAppSelector(state => state.notification.notices);

	const notify = ({ message, type, time = 1000 }: Notify) => {
		const id = Date.now();
		dispatch(
			addNotice({
				id,
				type,
				message,
			}),
		);

		setTimeout(() => {
			dispatch(deleteNotice(id));
		}, time);
	};

	return { notify, notices };
};

export default useNotice;
