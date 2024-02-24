import { useNavigate } from 'react-router-dom';

import BookPostCreateForm from '@/features/books/post/post-create.component.tsx';
import useConfirm from '@/hooks/use-confirm.ts';
import GeneralHeaderBack from '@/ui/general-header-back.tsx';
import GeneralHeader from '@/ui/general-header.tsx';
import GeneralMain from '@/ui/general-main.tsx';

const BookCreatePage = () => {
	const navigate = useNavigate();
	const { confirm } = useConfirm();
	const goBack = () => {
		confirm('작성을 취소하시겠습니까?', () => {
			navigate(-1);
		});
		// const isConfirmed = window.confirm('작성을 취소하시겠습니까?');
		// if (!isConfirmed) return;
		// navigate(-1);
	};

	return (
		<>
			<GeneralHeader>
				<GeneralHeaderBack onClick={goBack} />
			</GeneralHeader>

			<GeneralMain>
				<BookPostCreateForm />
			</GeneralMain>
		</>
	);
};

export default BookCreatePage;
