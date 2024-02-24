import { useState } from 'react';

import { Notice } from '@/types/notification.type.ts';
import Toast from '@/ui/toast.tsx';

const Noti = ({ notice }: { notice: Notice }) => {
	const [isShow, setIsShow] = useState(true);

	const closeHandler = () => {
		setIsShow(false);
	};

	return isShow && <Toast {...notice} onClose={closeHandler} />;
};

export default Noti;
