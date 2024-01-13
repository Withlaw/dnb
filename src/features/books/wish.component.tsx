const BookPostWish = ({ children }: { children: React.ReactNode }) => {
	const wishHandler = () => {
		window.alert('준비중입니다.');
	};
	return <span onClick={wishHandler}>{children}</span>;
};

export default BookPostWish;
