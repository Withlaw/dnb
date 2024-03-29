import { useNavigate } from 'react-router-dom';

import BookPostEditForm from '@/features/books/post/post-edit.component.tsx';
import useConfirm from '@/hooks/use-confirm.ts';
import GeneralHeaderBack from '@/ui/general-header-back.tsx';
import GeneralHeader from '@/ui/general-header.tsx';
import GeneralMain from '@/ui/general-main.tsx';

const BookEditPage = () => {
	const navigate = useNavigate();
	const { confirm } = useConfirm();

	const goBack = () => {
		confirm('글 수정을 취소하시겠습니까?', () => {
			navigate(-1);
		});
		// const isConfirmed = window.confirm('글 수정을 취소하시겠습니까?');
		// if (!isConfirmed) return;
		// navigate(-1);
	};

	return (
		<>
			<GeneralHeader>
				<GeneralHeaderBack onClick={goBack} />
			</GeneralHeader>

			<GeneralMain>
				<BookPostEditForm />
			</GeneralMain>
		</>
	);
};

export default BookEditPage;
