import { useCallback, useEffect, useState } from 'react';

import {
	activateConfirm,
	onConfirmCallback,
} from '@/features/confirmation/slice.ts';
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux.tsx';

const useConfirm = () => {
	const [callback, setCallback] = useState<() => void>();
	const { isConfirmed } = useAppSelector(state => state.confirmation);
	const dispatch = useAppDispatch();

	const confirm = useCallback(
		(message: string, confirmHandler?: () => void) => {
			setCallback(() => confirmHandler);
			dispatch(
				activateConfirm({
					message,
				}),
			);
		},
		[],
	);

	useEffect(() => {
		if (callback && isConfirmed) {
			dispatch(onConfirmCallback(callback));
		}
	}, [isConfirmed]);

	// return { confirm };
	return { confirm };
};

export default useConfirm;
