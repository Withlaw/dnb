import { activateConfirm } from '@/features/confirmation/slice.ts';
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux.tsx';

const useConfirm = () => {
	const { isConfirmed } = useAppSelector(state => state.confirmation);
	const dispatch = useAppDispatch();

	const confirm = (message: string, confirmHandler: () => void) => {
		// console.log('confirm fn: ', confirmHandler, JSON.stringify(confirmHandler));
		dispatch(
			activateConfirm({
				message,
			}),
		);
    // callback 함수를 액션 내부에서 호출하려면 함수를 디스패치로 전달해야 하는데
    // 함수는 직렬화가 되지 않아서 리덕스에서 경고를 내보냄.
	};

	// return { confirm };
	return { isConfirmed, confirm };
};

export default useConfirm;
