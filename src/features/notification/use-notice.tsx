import { useAppDispatch, useAppSelector } from '@/hooks/use-redux.tsx';

const useNotice = () => {
	const dispatch = useAppDispatch();
	const notices = useAppSelector(state => state.notification.messages);

	return null;
};

export default useNotice;
