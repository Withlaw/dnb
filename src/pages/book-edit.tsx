import { HiChevronLeft } from 'react-icons/hi';
import { ScrollRestoration, useNavigate } from 'react-router-dom';

import BookPostEditForm from '@/features/books/post-edit.component.tsx';
import GeneralHeader from '@/ui/general-header.tsx';
import GeneralMain from '@/ui/general-main.tsx';

const BookEditPage = () => {
	const navigate = useNavigate();
	const goBack = () => {
		const isConfirmed = window.confirm('작성을 취소하시겠습니까?');
		if (!isConfirmed) return;
		navigate(-1);
	};

	return (
		<>
			<GeneralHeader className="md:w-96">
				<div className="flex min-w-4" onClick={goBack}>
					<div>
						<span className="text-2xl hover:cursor-pointer">
							<HiChevronLeft />
						</span>
					</div>
				</div>
			</GeneralHeader>

			<GeneralMain>
				<BookPostEditForm />
			</GeneralMain>

			<ScrollRestoration />
		</>
	);
};

export default BookEditPage;
