import userEvent from '@testing-library/user-event';

import { render, screen } from '@/__tests__/notification/utils.tsx';
import useNotice from '@/hooks/use-notice.ts';
import Notices from '@/ui/notices.tsx';

// use notice 훅을 실행 할 테스트 용 컴포넌트 생성
const TestNotices = ({ message }: { message: string }) => {
	const { notify } = useNotice();
	const btnHandler = () => {
		notify(message, { time: 1000 });
	};
	return (
		<>
			<button onClick={btnHandler}>notify</button>
			<Notices />
		</>
	);
};

describe('Notices component', () => {
	test('useNotice 훅의 notify를 호출 시 "test message 1" 렌더링', async () => {
		const user = userEvent.setup();

		// notices 컴포넌트의 createPortal 함수 설정을 위해 root 노드 생성
		const container = document.createElement('div');
		container.id = 'root';
		document.body.appendChild(container);

		render(<TestNotices message="test message 1" />);

		// notify 버튼 ui 렌더링
		const buttonEl = screen.getByRole('button', { name: 'notify' });
		expect(buttonEl).toBeInTheDocument();
		expect(screen.queryByText('test message 1')).not.toBeInTheDocument();

		// notify 버튼 클릭시 'test message' 텍스트 렌더링
		await user.click(buttonEl);
		expect(screen.getByText('test message 1')).toBeInTheDocument();
	});

	test('notify를 두 번 호출 시 "test message 1", "test message 2" 렌더링', async () => {
		const user = userEvent.setup();

		const container = document.createElement('div');
		container.id = 'root';
		document.body.appendChild(container);

		render(<TestNotices message="test message 2" />);

		await user.click(screen.getByRole('button', { name: 'notify' }));

		expect(screen.getByText('test message 1')).toBeInTheDocument();
		expect(screen.getByText('test message 2')).toBeInTheDocument();
	});
});
