import { useCallback, useState } from 'react';

import { addNotice, deleteNotice } from '@/features/notification/slice.ts';
import { NotifyOptions } from '@/features/notification/types.ts';
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux.tsx';

const useNotice = () => {
	const [prevNotiId, setPrevNotiId] = useState<number>();
	const [prevTimer, setPrevTimer] = useState<NodeJS.Timeout>();
	const dispatch = useAppDispatch();
	const notices = useAppSelector(state => state.notification.notices);

	const notify = useCallback(
		(
			message: string,
			{ type = 'success', time = 2000 }: NotifyOptions | undefined = {},
		) => {
			if (prevNotiId) {
				// 이미 알림이 화면에 떠있다면 기존 알림 초기화 후 재설정
				dispatch(deleteNotice(prevNotiId));
				clearTimeout(prevTimer);
			}

			const id = Date.now();

			dispatch(
				addNotice({
					id,
					type,
					message,
				}),
			);

			const timer = setTimeout(() => {
				dispatch(deleteNotice(id));
			}, time);

			setPrevNotiId(id);
			setPrevTimer(timer);
		},
		[prevNotiId, prevTimer, dispatch],
	);

	return { notify, notices };
};

export default useNotice;
