import { describe, expect, test } from 'vitest';

import { BookDataFromServer } from '@/features/books/books.model.ts';
import Return from '@/features/rentals/return.component.tsx';

import { render, screen } from './utils.tsx';

describe('Return 컴포넌트', () => {
	test('렌탈 id가 존재하지 않으면 반납하기 버튼을 렌더링 하지 않는다.', () => {
		render(<Return book={{} as BookDataFromServer} />);

		expect(
			screen.queryByRole('button', { name: '반납하기' }),
		).not.toBeInTheDocument();
	});

	test('렌탈 id가 존재하면 반납하기 버튼을 렌더링 한다.', () => {
		render(<Return book={{ rentalId: 1 } as BookDataFromServer} />);

		expect(
			screen.getByRole('button', { name: '반납하기' }),
		).toBeInTheDocument();
	});
});
