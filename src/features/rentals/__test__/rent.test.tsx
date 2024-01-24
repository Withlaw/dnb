import { describe, expect, test } from 'vitest';

import { BookDataFromServer } from '@/features/books/books.model.ts';
import Rent from '@/features/rentals/rent.component.tsx';

import { render, screen } from './utils.tsx';

describe('Rent 컴포넌트', () => {
	test('rentalId가 존재하지 않으면 대여하기 버튼을 렌더링 한다.', () => {
		render(<Rent book={{} as BookDataFromServer} />);

		expect(
			screen.getByRole('button', { name: '대여하기' }),
		).toBeInTheDocument();
	});

	test('rentalId가 존재하면 대여하기 버튼을 렌더링 하지 않는다.', () => {
		render(<Rent book={{ rentalId: 1 } as BookDataFromServer} />);

		expect(
			screen.queryByRole('button', { name: '대여하기' }),
		).not.toBeInTheDocument();
	});
});
