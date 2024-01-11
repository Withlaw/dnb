import { HiMenu, HiOutlineSearch } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { ScrollRestoration } from 'react-router-dom';

import BooksPreviewItems from '@/features/books/preview-items.component.tsx';
import Button from '@/ui/button.tsx';
import GeneralHeader from '@/ui/general-header.tsx';
import GeneralMain from '@/ui/general-main.tsx';
import NavMain from '@/ui/nav-main.tsx';

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
					<span className="ml-4">
						<HiOutlineSearch size="24" />
					</span>
					<span className="ml-4">
						<HiMenu size="24" />
					</span>
				</div>
			</GeneralHeader>

			{/* <aside className="bg-green-800">app aside</aside> */}
			<GeneralMain>
				<div className="flex flex-col py-2">
					<div className="flex-initial">
						<Link to="create">
							{/* 당근처럼 아이콘으로? */}
							<Button>글쓰기</Button>
						</Link>
					</div>

					<div className="flex-auto py-2">
						<BooksPreviewItems />
					</div>
				</div>
			</GeneralMain>

			{/* <footer>app footer</footer> */}
			<NavMain />

			{/* 페이지 전환시 스크롤 초기화 */}
			<ScrollRestoration />
		</>
	);
};

export default BooksPreviewPage;
