import { describe, expect } from 'vitest';

import { BookDataFromServer } from '@/features/books/books.model.ts';
import Rent from '@/features/rentals/rent.component.tsx';

import { render, screen } from './utils.tsx';

describe('Rent 컴포넌트', () => {
	it('대여하기 버튼을 렌더링 한다.', () => {
		render(<Rent book={{} as BookDataFromServer} />);

		expect(
			screen.getByRole('button', { name: '대여하기' }),
		).toBeInTheDocument();
	});
});
