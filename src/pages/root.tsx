import { Outlet, ScrollRestoration } from 'react-router-dom';

import Confirm from '@/features/confirmation/confirm.component.tsx';
import Notices from '@/features/notification/notices.component.tsx';

const RootPage = () => {
	return (
		<>
			<Outlet />
			<Notices />
			<Confirm />
			<ScrollRestoration />
		</>
	);
};

export default RootPage;
