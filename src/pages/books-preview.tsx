import { Link } from 'react-router-dom';

import BooksPreviewItems from '@/features/books/preview-items.component.tsx';
import Button from '@/ui/button.tsx';
import GeneralHeader from '@/ui/general-header.tsx';
import GeneralMain from '@/ui/general-main.tsx';
import GeneralNav from '@/ui/general-nav.tsx';
import Toast from '@/ui/toast.tsx';

const BooksPreviewPage = () => {
	return (
		<>
			<GeneralHeader>
				<div className="flex min-w-4">
					<div>
						<span className="text-xl tracking-widest">동네북</span>
					</div>
				</div>

				<div className="flex items-center justify-end">
					<span className="ml-4">{/* <HiOutlineSearch size="24" /> */}</span>
				</div>
			</GeneralHeader>

			{/* <aside className="bg-green-800">app aside</aside> */}
			<GeneralMain>
				<div className="flex flex-col py-2">
					<div>
						<Toast message="hello world" />
					</div>

					<div className="flex-initial">
						<Link to="create">
							{/* 당근처럼 아이콘으로? */}
							<Button>책 등록하기</Button>
						</Link>
					</div>

					<div className="flex-auto py-2">
						<BooksPreviewItems />
					</div>
				</div>
			</GeneralMain>

			{/* <footer>app footer</footer> */}
			<GeneralNav />
		</>
	);
};

export default BooksPreviewPage;
