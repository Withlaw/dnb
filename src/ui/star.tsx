import { HiStar } from 'react-icons/hi';

const Star = ({ grade }: { grade: number }) => {
	// const start =
	const count = +grade.toFixed();

	return [1, 2, 3, 4, 5].map(el => {
		if (el > count) return <HiStar key={el} color="#CCCCCC" />;
		if (el <= count) return <HiStar key={el} color="#FF9700" />;
	});
};

export default Star;
