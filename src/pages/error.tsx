import { Link, useLocation } from 'react-router-dom';

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
			<div className="my-10 flex w-full flex-col items-center justify-center space-y-2">
				<h1>
					준비중인 페이지입니다<div className=""></div>
				</h1>

				<div>
					<Link to="/">&rarr; 홈으로 가기</Link>
				</div>
			</div>
		);

	return (
		<div className="my-4 flex w-full flex-col items-center justify-center space-y-2 ">
			<h1>{`${status} ${statusText}`}</h1>
			{/* <h2>{title}</h2> */}
			{/* <p>{message}</p> */}
			<div>
				<Link to="/">&rarr; 홈으로 가기</Link>
			</div>
		</div>
	);
};

export default ErrorPage;
