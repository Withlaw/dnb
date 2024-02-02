import { BookDataFromServer } from '@/features/books/model.ts';
import Return from '@/features/rentals/return.component.tsx';
import { UserDataFromServer } from '@/features/users/model.ts';

import { render, screen } from './utils.tsx';

describe('Return 컴포넌트', () => {
	test('일반적인 상황에서 반납하기 버튼을 렌더링 하지 않는다.', () => {
		render(<Return book={{} as BookDataFromServer} />);

		expect(
			screen.queryByRole('button', { name: '반납하기' }),
		).not.toBeInTheDocument();
	});

	test('내가 대여한 책에서는 반납하기 버튼을 렌더링 한다.', () => {
		render(
			<Return
				book={{ rentalId: 1 } as BookDataFromServer}
				user={{ id: 1 } as UserDataFromServer}
			/>,
		);

		expect(
			screen.getByRole('button', { name: '반납하기' }),
		).toBeInTheDocument();
	});
});
