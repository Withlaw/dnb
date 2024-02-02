import { createPortal } from 'react-dom';

import Noti from '@/features/notification/notice.component.tsx';
import useNotice from '@/features/notification/use-notice.hook.ts';

const Notices = () => {
	const { notices } = useNotice();

	return createPortal(
		<div className="fixed bottom-20 z-[9990] flex w-full justify-center ">
			<div className="flex-col space-y-2">
				{notices.map(notice => (
					<Noti key={notice.id} notice={notice} />
				))}
			</div>
		</div>,
		document.getElementById('root')!,
	);
};

export default Notices;
