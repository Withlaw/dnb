import useNotice from '@/hooks/use-notice.ts';

const BookPostWish = ({ children }: { children: React.ReactNode }) => {
	const { notify } = useNotice();
	const wishHandler = () => {
		notify('아직 준비 중인 기능입니다', {
			type: 'error',
		});
	};

	return <span onClick={wishHandler}>{children}</span>;
};

export default BookPostWish;
