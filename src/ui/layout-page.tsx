import { Outlet } from 'react-router-dom';

import GeneralLayout from '@/ui/general-layout.tsx';

const PageLayout = () => {
	return (
		<GeneralLayout>
			<Outlet />
		</GeneralLayout>
	);
};

export default PageLayout;
