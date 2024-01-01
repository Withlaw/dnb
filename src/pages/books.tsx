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
		status: '예약가능',
		imageUrl:
			'https://images.unsplash.com/photo-1682685794304-99d3d07c57d2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw0MXx8fGVufDB8fHx8fA%3D%3D',
	},
];

const BooksPage = () => {
	return (
		<div className="flex flex-col py-2">
			<div className="flex-initial">
				<button className="h-8 w-full bg-green-600">책 등록하기</button>
			</div>
			<div className="flex-auto py-2">
				<ul className="flex w-full flex-col flex-nowrap items-center  sm:grid sm:grid-cols-2">
					{dummy.map(book => {
						return (
							<li className="border-back my-1 flex w-full justify-between rounded-xl border border-solid border-stone-200 p-4 shadow-md">
								<figure className="flex-none">
									<img
										className="h-48 w-36"
										src={book.imageUrl}
										alt={book.title}
									/>
									{/* 이미지 사이즈는 업로드시에 규격에 맞게 리사이징하므로 style 사이즈는 딱히 필요 없을 듯? */}
								</figure>
								<div className="flex flex-auto justify-between bg-red-700 pl-3">
									<div className="flex w-20 flex-auto flex-col items-start ">
										<h4 className="w-full break-words ">{book.title}</h4>
										<p>{book.merchantName}</p>
										<p>{book.fee}원</p>
									</div>
									<div className="flex-none bg-red-300">
										<h4>{book.status}</h4>
									</div>
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

export default BooksPage;
