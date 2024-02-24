import { useCallback, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks/use-redux.tsx';
import {
	activateConfirm,
	onConfirmCallback,
} from '@/slices/confirmation.slice.ts';

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
			dispatch(onConfirmCallback()).then(() => {
				callback();
			});
		}
	}, [isConfirmed]);

	// return { confirm };
	return { confirm };
};

export default useConfirm;
