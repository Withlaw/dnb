import { useQuery } from '@tanstack/react-query';

import { BooksPreviewModel } from '@/features/books/books.model.ts';
import BooksPreviewItem from '@/features/books/preview-item.component.tsx';
import { booksService } from '@/services/books-service.ts';

/* 
// dummy data
type BooksPreview = {
	id: string;
	title: string;
	imageUrl: string;
	fee: number;
	status: string;
	merchantName: string;
};

const dummy: BooksPreview[] = [
	{
		id: '1',
		title: 'testsfasfasdasdfsdafsdf31asdffadsfaadkasjf1',
		merchantName: 'tester',
		fee: 100,
		status: '예약가능',
		imageUrl:
			'https://images.unsplash.com/photo-1703593693062-16aab101121a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMnx8fGVufDB8fHx8fA%3D%3D',
	},
	{
		id: '2',
		title: 'test2',
		merchantName: 'tester',
		fee: 200,
		status: '예약가능',
		imageUrl:
			'https://images.unsplash.com/photo-1682685797857-97de838c192e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwzMXx8fGVufDB8fHx8fA%3D%3D',
	},
	{
		id: '3',
		title: 'test3',
		merchantName: 'tester',
		fee: 300,
		status: '예약가능',
		imageUrl:
			'https://images.unsplash.com/photo-1682688759457-52bcb4dc1578?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwzNnx8fGVufDB8fHx8fA%3D%3D',
	},
	{
		id: '4',
		title: 'test4',
		merchantName: 'tester',
		fee: 400,
		status: '예약 가능',
		imageUrl:
			'https://images.unsplash.com/photo-1682685794304-99d3d07c57d2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw0MXx8fGVufDB8fHx8fA%3D%3D',
	},
	{
		id: '15',
		title: 'testsfasfasdasdfsdafsdf31asdffadsfaadkasjf1',
		merchantName: 'tester',
		fee: 100,
		status: '예약가능',
		imageUrl:
			'https://images.unsplash.com/photo-1703593693062-16aab101121a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMnx8fGVufDB8fHx8fA%3D%3D',
	},
	{
		id: '42',
		title: 'test2',
		merchantName: 'tester',
		fee: 200,
		status: '예약가능',
		imageUrl:
			'https://images.unsplash.com/photo-1682685797857-97de838c192e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwzMXx8fGVufDB8fHx8fA%3D%3D',
	},
	{
		id: '7',
		title: 'test3',
		merchantName: 'tester',
		fee: 300,
		status: '예약가능',
		imageUrl:
			'https://images.unsplash.com/photo-1682688759457-52bcb4dc1578?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwzNnx8fGVufDB8fHx8fA%3D%3D',
	},
	{
		id: '8',
		title: 'test4',
		merchantName: 'tester',
		fee: 400,
		status: '예약 가능',
		imageUrl:
			'https://images.unsplash.com/photo-1682685794304-99d3d07c57d2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw0MXx8fGVufDB8fHx8fA%3D%3D',
	},
];
*/

const BooksPreviewItems = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['books'],
		queryFn: booksService.getBooks.bind(booksService),
	});

	const books = data?.map(data => new BooksPreviewModel(data));

	return (
		<ul className="flex w-full flex-col flex-nowrap items-center sm:grid sm:grid-cols-2 sm:gap-3">
			{isLoading ?? <h1>Loading...</h1>}
			{books &&
				books.map(book => {
					return <BooksPreviewItem book={book} key={book.id} />;
				})}
		</ul>
	);
};

export default BooksPreviewItems;
