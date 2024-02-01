import userEvent from '@testing-library/user-event';

import UserServiceProvider from '@/contexts/user-service.context.tsx';
import { render, screen } from '@/features/users/__test__/utils.tsx';
import UserDetail from '@/features/users/user-detail.component.tsx';
import { UserServiceTest } from '@/services/user-service.ts';

const App = ({ userService }: { userService: UserServiceTest }) => {
	return (
		<UserServiceProvider userService={userService}>
			<UserDetail />
		</UserServiceProvider>
	);
};

describe('UserDetail/UserInfo', () => {
	test.skip('유저 정보 페이지 접근 시, 미 로그인 상태에서 렌더링되는 요소 없음', async () => {
		const userServiceTest = new UserServiceTest({ isLogin: false });
		render(<App userService={userServiceTest} />);
		expect(screen.queryByText('user')).not.toBeInTheDocument();

		// skip한 이유: isLogin: false 전달한 App이 아래에 테스트에서도 상태가 이어짐...
	});

	test('로그인 상태에서 유저 정보 렌더링', async () => {
		const userServiceTest = new UserServiceTest({ isLogin: true });
		render(<App userService={userServiceTest} />);

		expect(await screen.findByText('email')).toBeInTheDocument();
		expect(await screen.findByText('fullName')).toBeInTheDocument();
		expect(await screen.findByText('address')).toBeInTheDocument();
		expect(await screen.findByText('(5)')).toBeInTheDocument();
	});
});

describe('UserDetail/UserBooks', () => {
	test('로그인 상태에서 등록한 책 리스트 렌더링', async () => {
		const userServiceTest = new UserServiceTest({ isLogin: true });
		render(<App userService={userServiceTest} />);
		expect(
			await screen.findByText('title', { exact: false }),
		).toBeInTheDocument();
		expect(
			await screen.findByText('author', { exact: false }),
		).toBeInTheDocument();
		expect(
			await screen.findByText('publisher', { exact: false }),
		).toBeInTheDocument();
		expect(
			await screen.findByText('1원', { exact: false }),
		).toBeInTheDocument();

		expect(
			(await screen.findAllByText('대여 가능', { exact: false })).length,
		).toBeGreaterThan(1);
	});

	test('tab 요소로 등록한 책, 빌린 책 렌더링', async () => {
		const userServiceTest = new UserServiceTest({ isLogin: true });
		render(<App userService={userServiceTest} />);

		expect(
			await screen.findByRole('button', { name: '등록한 책' }),
		).toBeInTheDocument();
		expect(
			await screen.findByRole('button', { name: '빌린 책' }),
		).toBeInTheDocument();
	});

	test('등록한 책 필터링 요소로 전체, 대여 가능, 대여 불가 options 렌더링', async () => {
		const userServiceTest = new UserServiceTest({ isLogin: true });
		render(<App userService={userServiceTest} />);

		expect(
			await screen.findByRole('option', { name: '전체' }),
		).toBeInTheDocument();
		expect(
			await screen.findByRole('option', { name: '대여 가능' }),
		).toBeInTheDocument();
		expect(
			await screen.findByRole('option', { name: '대여 불가' }),
		).toBeInTheDocument();
	});

	test.skip('책이 대여 상태일 때 대여 불가 텍스트 렌더링', async () => {
		const userServiceTest = new UserServiceTest({
			isLogin: true,
			rentalId: 1,
		});
		render(<App userService={userServiceTest} />);

		expect(
			await screen.findByText('title', { exact: false }),
		).toBeInTheDocument();

		expect(
			(await screen.findAllByText('대여 불가', { exact: false })).length,
		).toBeGreaterThan(1);

		// 필터링 옵션 포함해서 대여 불가 텍스트가 2개 이상 렌더링
	});
});

describe('UserDetail/UserRentals', () => {
	const user = userEvent.setup();

	test('로그인 상태에서 빌린 책 탭 클릭시 빌린 책 리스트 렌더링', async () => {
		const userServiceTest = new UserServiceTest({ isLogin: true });
		render(<App userService={userServiceTest} />);

		await user.click(await screen.findByText('빌린 책', { exact: false }));
		expect(
			await screen.findByText('rental', { exact: false }),
		).toBeInTheDocument();
	});

	test('빌린 책 필터링 요소로 전체, 대여중, 반납 options 렌더링', async () => {
		const userServiceTest = new UserServiceTest({ isLogin: true });
		render(<App userService={userServiceTest} />);

		await user.click(await screen.findByText('빌린 책', { exact: false }));
		expect(
			await screen.findByRole('option', { name: '전체' }),
		).toBeInTheDocument();
		expect(
			await screen.findByRole('option', { name: '대여중' }),
		).toBeInTheDocument();
		expect(
			await screen.findByRole('option', { name: '반납 완료' }),
		).toBeInTheDocument();
	});

	test('빌린 책 탭에서 대여중 필터링 시 대여중 책 렌더링', async () => {
		const userServiceTest = new UserServiceTest({ isLogin: true });
		render(<App userService={userServiceTest} />);

		await user.click(await screen.findByText('빌린 책', { exact: false }));
		await user.click(await screen.findByRole('option', { name: '대여중' }));
		expect(
			(await screen.findAllByText('대여중', { exact: false })).length,
		).toBeGreaterThan(1);
	});

	test.skip('빌린 책 탭에서 반납 완료 필터링 시 렌더링되는 대여중인 책 없음', async () => {
		const userServiceTest = new UserServiceTest({ isLogin: true });
		render(<App userService={userServiceTest} />);

		await user.click(await screen.findByText('빌린 책', { exact: false }));
		await user.selectOptions(await screen.findByRole('listbox'), 'return');
		// select change event 에러

		expect(
			(await screen.findAllByText('대여중', { exact: false })).length,
		).toBe(1);

		//
	});
});
