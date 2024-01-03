import { Link } from 'react-router-dom';

import BooksPreviewItems from '@/features/books/preview-items.component.tsx';
import Button from '@/ui/button.tsx';

const BooksPreviewPage = () => {
	return (
		<div className="flex flex-col py-2">
			<div className="flex-initial">
				<Link to="write">
					{/* 당근처럼 아이콘으로? */}
					<Button>글쓰기</Button>
				</Link>
			</div>
			<div className="flex-auto py-2">
				<BooksPreviewItems />
			</div>
		</div>
	);
};

export default BooksPreviewPage;
