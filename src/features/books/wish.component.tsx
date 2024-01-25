import useNotice from '@/features/notification/use-notice.tsx';

const BookPostWish = ({ children }: { children: React.ReactNode }) => {
	const { notify } = useNotice();
	const wishHandler = () => {
		// window.alert('준비중입니다.');
		const num = (Math.random() * 100).toFixed();
		notify({ message: '준비중입니다' + num, type: 'error' });
	};
	return <span onClick={wishHandler}>{children}</span>;
};

export default BookPostWish;
