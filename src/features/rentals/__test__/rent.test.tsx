import { render, screen } from '@testing-library/react';
import { describe, expect } from 'vitest';

import { BookDataFromServer } from '@/features/books/books.model.ts';
import Rent from '@/features/rentals/rent.component.tsx';

describe('Rent', () => {
	it('should render the rent', () => {
		render(<Rent type="rent" book={{} as BookDataFromServer} />);

		expect(
			screen.getByRole('button', { name: '대여하기' }),
		).toBeInTheDocument();
	});
});
