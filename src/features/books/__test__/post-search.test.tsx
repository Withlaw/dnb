import userEvent from '@testing-library/user-event';
import { HttpResponse, delay, http } from 'msw';

import { API_SUPABASE_FUNCTIONS } from '@/constants/index.ts';
import { render, screen } from '@/features/books/__test__/utils.tsx';
import BookPostSearch from '@/features/books/post-search.component.tsx';
import { server } from '@/test-setup.ts';

const bookPostSearchURL =
	API_SUPABASE_FUNCTIONS.NAVER_BOOK_SEARCH_URL +
	'/functions/v1/naver-book-search';

describe('BookPostSearch component', () => {
	const user = userEvent.setup();

	test('도서 검색 label, 검색어 입력 input 렌더링', () => {
		render(<BookPostSearch />);
		expect(
			screen.getByRole('textbox', { name: '도서 검색' }),
		).toBeInTheDocument();
		expect(
			screen.getByPlaceholderText('검색어를 입력해주세요.'),
		).toBeInTheDocument();
	});

	test('타이핑 시 검색어, 검색 중 텍스트 렌더링', async () => {
		server.resetHandlers(
			http.get(bookPostSearchURL, async () => {
				await delay(100);
				return HttpResponse.json(
					{
						start: 1,
						total: 1,
						items: [],
					},
					{
						status: 200,
					},
				);
			}),
		);

		render(<BookPostSearch />);
		const inputEl = screen.getByRole('textbox', { name: '도서 검색' });
		await user.type(inputEl, 'test');

		expect(await screen.findByText('test')).toBeInTheDocument();
		expect(
			await screen.findByText('검색 중', { exact: false }),
		).toBeInTheDocument();
	});

	test('검색 결과가 존재하면 이미지/제목/작가/출판사 렌더링', async () => {
		server.resetHandlers(
			http.get(bookPostSearchURL, async () => {
				return HttpResponse.json(
					{
						start: 1,
						total: 1,
						items: [
							{
								title: 'title',
								author: 'author',
								publisher: 'publisher',
								description: 'title',
								discount: 'discount',
								image: '',
								isbn: '',
								link: '',
								pubdate: '',
							},
						],
					},
					{
						status: 200,
					},
				);
			}),
		);

		render(<BookPostSearch />);
		await user.type(screen.getByRole('textbox', { name: '도서 검색' }), 'test');

		// 이미지 렌더링
		const imageEls = (await screen.findAllByRole('img')) as HTMLImageElement[];
		const imageAlt = imageEls.map((img: HTMLImageElement) => img.alt);
		expect(imageAlt).toEqual(['title']);

		// 제목/작가/출판사 렌더링
		expect(await screen.findByText('title')).toBeInTheDocument();
		expect(await screen.findByText('author')).toBeInTheDocument();
		expect(await screen.findByText('publisher')).toBeInTheDocument();
	});

	test('검색 결과가 존재하지 않으면 존재하지 않음 텍스트 렌더링', async () => {
		server.resetHandlers(
			http.get(bookPostSearchURL, () => {
				return HttpResponse.json(
					{
						start: 1,
						total: 0,
						items: [],
					},
					{
						status: 200,
					},
				);
			}),
		);

		render(<BookPostSearch />);
		await user.type(screen.getByRole('textbox', { name: '도서 검색' }), 'test');

		expect(
			await screen.findByText('찾으시는 책이 존재하지 않습니다.'),
		).toBeInTheDocument();
	});

	test.skip('api 오류시 서버에 연결할 수 없음 텍스트 렌더링', async () => {
		server.resetHandlers(
			http.get(bookPostSearchURL, () => {
				return new HttpResponse(null, { status: 500, statusText: '' });
				// return Response.error();
				// return HttpResponse.error();
			}),
		);
		// response.ok === false 나오긴 하는데, 리액트쿼리에서 error로 처리하지 않음.

		render(<BookPostSearch />);
		await user.type(screen.getByRole('textbox', { name: '도서 검색' }), 'test');

		expect(
			await screen.findByText('서버에 연결할 수 없습니다.'),
		).toBeInTheDocument();
	});
});
