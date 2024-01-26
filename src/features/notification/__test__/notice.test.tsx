import userEvent from '@testing-library/user-event';

import { render, screen } from '@/features/notification/__test__/utils.tsx';
import Noti from '@/features/notification/notice.component.tsx';

describe('Notice component', () => {
	test('notice 전달 시 message 및 close 아이콘 렌더링', () => {
		render(
			<Noti notice={{ id: 1, message: 'test messege', type: 'success' }} />,
		);

		expect(screen.getByText('test messege')).toBeInTheDocument();
		expect(screen.getByTitle('close')).toBeInTheDocument();
	});

	test('success type으로 notice 전달 시 success 아이콘 렌더링', () => {
		render(
			<Noti notice={{ id: 1, message: 'test messege', type: 'success' }} />,
		);
		const successIconEl = screen.getByTitle('success');
		const errorIconEl = screen.queryByTitle('error');

		expect(successIconEl).toBeInTheDocument();
		expect(errorIconEl).not.toBeInTheDocument();
	});

	test('error type으로 notice 전달 시 error 아이콘 렌더링', () => {
		render(<Noti notice={{ id: 1, message: 'test messege', type: 'error' }} />);

		const errorIconEl = screen.getByTitle('error');
		const successIconEl = screen.queryByTitle('success');

		expect(errorIconEl).toBeInTheDocument();
		expect(successIconEl).not.toBeInTheDocument();
	});

	test('close 아이콘 클릭시 message 언마운트', async () => {
		const user = userEvent.setup();

		render(
			<Noti notice={{ id: 1, message: 'test messege', type: 'success' }} />,
		);

		expect(screen.getByText('test messege')).toBeInTheDocument();

		await user.click(screen.getByTitle('close'));

		expect(screen.queryByText('test messege')).not.toBeInTheDocument();
	});
});
