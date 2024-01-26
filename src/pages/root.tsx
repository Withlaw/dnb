import { Outlet, ScrollRestoration } from 'react-router-dom';

import Notices from '@/features/notification/notices.component.tsx';

const RootPage = () => {
	return (
		<>
			<Outlet />
			<Notices />
			<ScrollRestoration />
		</>
	);
};

export default RootPage;
