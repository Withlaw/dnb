import useNotice from '@/features/notification/use-notice.tsx';

const BookPostWish = ({ children }: { children: React.ReactNode }) => {
	const { notify } = useNotice();
	const wishHandler = () => {
		// window.alert('준비중입니다.');
		notify({ message: '준비중입니다', type: 'error', time: 1000 });
	};

	return <span onClick={wishHandler}>{children}</span>;
};

export default BookPostWish;
