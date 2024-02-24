import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import UserServiceProvider from '@/contexts/user-service.context.tsx';
import Authorization from '@/features/users/authorization/authorization.component.tsx';
import { UserServiceTest } from '@/services/user-service.ts';

// 리액트 쿼리 테스트 할 때 캐시 기능이 다음 테스트에 영향을 미치지 않도록 캐시 gcTime을 0으로 설정
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			gcTime: 0,
		},
	},
});

const Home = () => <h1>Home Page</h1>;
const Signin = () => <h1>Sign-in Page</h1>;
const Test = ({ path }: { path: 'guest-only' | 'protected' }) => (
	<Authorization
		route={{
			id: path,
		}}>
		<h1>{path} Page</h1>
	</Authorization>
);

const App = ({
	userService,
	path,
}: {
	userService: UserServiceTest;
	path: 'guest-only' | 'protected';
}) => (
	<QueryClientProvider client={queryClient}>
		<UserServiceProvider userService={userService}>
			<BrowserRouter>
				<div>
					<Link to="/">Home</Link>
					<Link to="/test">Test</Link>

					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/test" element={<Test path={path} />} />
						<Route path="/sign-in" element={<Signin />} />
					</Routes>
				</div>
			</BrowserRouter>
		</UserServiceProvider>
	</QueryClientProvider>
);

describe('Authorizatoin', () => {
	const user = userEvent.setup();

	test('guest-only 페이지 접근 시, 미 로그인 상태에서 페이지 렌더링', async () => {
		const userServiceTest = new UserServiceTest({ isLogin: false });

		render(<App userService={userServiceTest} path="guest-only" />);

		await user.click(screen.getByRole('link', { name: /home/i }));
		expect(
			screen.getByRole('heading', { name: /home page/i }),
		).toBeInTheDocument();
		expect(
			screen.queryByRole('heading', { name: /guest-only page/i }),
		).not.toBeInTheDocument();
		expect(
			screen.queryByRole('heading', { name: /sign-in page/i }),
		).not.toBeInTheDocument();

		await user.click(screen.getByRole('link', { name: /test/i }));
		expect(
			screen.getByRole('heading', { name: /guest-only page/i }),
		).toBeInTheDocument();
		expect(
			screen.queryByRole('heading', { name: /home page/i }),
		).not.toBeInTheDocument();
		expect(
			screen.queryByRole('heading', { name: /sign-in page/i }),
		).not.toBeInTheDocument();
	});

	test('guest-only 페이지 접근 시, 로그인 상태에서 root 페이지로 리다이렉트', async () => {
		const userServiceTest = new UserServiceTest({ isLogin: true });
		const user = userEvent.setup();

		render(<App userService={userServiceTest} path="guest-only" />);

		await user.click(screen.getByRole('link', { name: /home/i }));
		await user.click(screen.getByRole('link', { name: /test/i }));
		expect(
			screen.getByRole('heading', { name: /home page/i }),
		).toBeInTheDocument();
	});

	test('protected 페이지 접근 시, 미 로그인 상태에서 sign-in 페이지로 리다이렉트', async () => {
		const userServiceTest = new UserServiceTest({ isLogin: false });
		render(<App userService={userServiceTest} path="protected" />);

		await user.click(screen.getByRole('link', { name: /home/i }));
		await user.click(screen.getByRole('link', { name: /test/i }));
		expect(
			screen.getByRole('heading', { name: /sign-in page/i }),
		).toBeInTheDocument();
	});

	test('protected 페이지 접근 시, 로그인 상태에서 페이지 렌더링', async () => {
		const userServiceTest = new UserServiceTest({ isLogin: true });
		render(<App userService={userServiceTest} path="protected" />);

		await user.click(screen.getByRole('link', { name: /home/i }));
		await user.click(screen.getByRole('link', { name: /test/i }));
		expect(
			screen.getByRole('heading', { name: /protected/i }),
		).toBeInTheDocument();
	});
});
