import { BookDataFromServer } from '@/features/books/_model.ts';
import Rent from '@/features/rentals/rent.component.tsx';
import { UserDataFromServer } from '@/features/users/_model.ts';

import { render, screen } from './utils.tsx';

describe('Rent 컴포넌트', () => {
	test('일반적인 상황에서 대여하기 버튼을 렌더링 한다.', () => {
		render(<Rent book={{} as BookDataFromServer} />);

		expect(
			screen.getByRole('button', { name: '대여하기' }),
		).toBeInTheDocument();
	});

	test('내가 이미 대여한 책에서는 대여하기 버튼을 렌더링 하지 않는다.', () => {
		render(
			<Rent
				user={{ id: 1 } as UserDataFromServer}
				book={{ customerId: 1 } as BookDataFromServer}
			/>,
		);

		expect(
			screen.queryByRole('button', { name: '대여하기' }),
		).not.toBeInTheDocument();
	});
});
