import { createPortal } from 'react-dom';

import useNotice from '@/hooks/use-notice.ts';
import Noti from '@/ui/notice.tsx';

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
