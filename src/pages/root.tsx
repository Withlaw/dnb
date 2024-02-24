import { Outlet, ScrollRestoration } from 'react-router-dom';

import Confirm from '@/ui/confirm.tsx';
import Notices from '@/ui/notices.tsx';

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
