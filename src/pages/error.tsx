import { useLocation } from 'react-router-dom';

import useRouterError from '@/hooks/use-router-error.ts';

const ErrorPage = () => {
	const { pathname } = useLocation();

	let { title, message, status, statusText } = useRouterError();

	if (status === 404) {
		title = 'Not Found!';
		message = 'Could not find your resource or page.';
	}

	if (['/rental', '/map', '/chat'].includes(pathname))
		return (
			<div>
				<h1>
					준비중입니다<div className=""></div>
				</h1>
			</div>
		);

	return (
		<div>
			<h1>{`${status} ${statusText}`}</h1>
			<h2>{title}</h2>
			<p>{message}</p>
		</div>
	);
};

export default ErrorPage;
