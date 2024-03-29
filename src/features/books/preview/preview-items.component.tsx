import BooksPreviewItem from '@/features/books/_components/preview-item.component.tsx';
import useBooksPreview from '@/features/books/preview/use-books-preview.hook.ts';
import { BooksPreviewItemsSkeleton } from '@/ui/skeletons.tsx';

const BooksPreviewItems = () => {
	const { scrollEndTarget, books, hasNextPage, isLoading, isError, error } =
		useBooksPreview();

	return (
		<ul className="flex w-full flex-col flex-nowrap items-center ">
			{/* <ul className="flex w-full flex-col flex-nowrap items-center sm:grid sm:grid-cols-2 sm:gap-3"> */}
			{isError && <li>{error?.message}</li>}
			{!books && isLoading && <BooksPreviewItemsSkeleton num={4} />}
			{books &&
				books?.length !== 0 &&
				books.map(book => {
					return <BooksPreviewItem book={book} key={book.id} />;
				})}

			{books && hasNextPage && (
				<li ref={scrollEndTarget} className="h-10 w-full text-center">
					{/* <span>loading ...</span> */}
				</li>
			)}
			{books && books?.length === 0 && <li>등록된 책이 없습니다.</li>}
		</ul>
	);
};

export default BooksPreviewItems;

// legacy code
/* {dummy &&
				dummy.map(book => {
					return <BooksPreviewItem book={book} key={book.id} />;
				})} 

const dummy: BooksPreviewModel[] = [
	{
		status: '대여 가능',
		merchantName: 'merchantname',
		author: 'test',
		createdAt: '1',
		description: 'gadfgadfgafdg',
		publisher: 'testtest',
		id: 1,
		title: 'testsfasfasdasdfsdafsdf31asdffadsfaadkasjf1',
		fee: 100,
		imageUrl:
			'https://images.unsplash.com/photo-1703593693062-16aab101121a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMnx8fGVufDB8fHx8fA%3D%3D',
	},
	{
		status: '대여 가능',
		merchantName: 'merchantname',
		author: 'test',
		createdAt: '1',
		description: 'gadfgadfgafdg',
		publisher: 'testtest',
		id: 2,
		title: 'test2',
		fee: 200,
		imageUrl:
			'https://images.unsplash.com/photo-1682685797857-97de838c192e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwzMXx8fGVufDB8fHx8fA%3D%3D',
	},
	{
		status: '대여 가능',
		merchantName: 'merchantname',
		author: 'test',
		createdAt: '1',
		description: 'gadfgadfgafdg',
		publisher: 'testtest',
		id: 3,
		title: 'test3',
		fee: 300,
		imageUrl:
			'https://images.unsplash.com/photo-1682688759457-52bcb4dc1578?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwzNnx8fGVufDB8fHx8fA%3D%3D',
	},
	{
		status: '대여 가능',
		merchantName: 'merchantname',
		author: 'test',
		createdAt: '1',
		description: 'gadfgadfgafdg',
		publisher: 'testtest',
		id: 4,
		title: 'test4',
		fee: 400,
		status: '예약 가능',
		imageUrl:
			'https://images.unsplash.com/photo-1682685794304-99d3d07c57d2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw0MXx8fGVufDB8fHx8fA%3D%3D',
	},
	{
		status: '대여 가능',
		merchantName: 'merchantname',
		author: 'test',
		createdAt: '1',
		description: 'gadfgadfgafdg',
		publisher: 'testtest',
		id: 15,
		title: 'testsfasfasdasdfsdafsdf31asdffadsfaadkasjf1',
		fee: 100,
		imageUrl:
			'https://images.unsplash.com/photo-1703593693062-16aab101121a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMnx8fGVufDB8fHx8fA%3D%3D',
	},
	{
		status: '대여 가능',
		merchantName: 'merchantname',
		author: 'test',
		createdAt: '1',
		description: 'gadfgadfgafdg',
		publisher: 'testtest',
		id: 42,
		title: 'test2',
		fee: 200,
		imageUrl:
			'https://images.unsplash.com/photo-1682685797857-97de838c192e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwzMXx8fGVufDB8fHx8fA%3D%3D',
	},
	{
		status: '대여 가능',
		merchantName: 'merchantname',
		author: 'test',
		createdAt: '1',
		description: 'gadfgadfgafdg',
		publisher: 'testtest',
		id: 7,
		title: 'test3',
		fee: 300,
		imageUrl:
			'https://images.unsplash.com/photo-1682688759457-52bcb4dc1578?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwzNnx8fGVufDB8fHx8fA%3D%3D',
	},
	{
		author: 'test',
		createdAt: '1',
		description: 'gadfgadfgafdg',
		publisher: 'testtest',
		id: 8,
		title: 'test4',
		fee: 400,
		status: '대여 가능',
		merchantName: 'merchantname',
		imageUrl:
			'https://images.unsplash.com/photo-1682685794304-99d3d07c57d2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw0MXx8fGVufDB8fHx8fA%3D%3D',
	},
];
*/
