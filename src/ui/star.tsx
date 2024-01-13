import { HiStar } from 'react-icons/hi';

const Star = ({ grade }: { grade: number }) => {
	// const start =
	const count = +grade.toFixed();

	console.log('count', count);

	return [1, 2, 3, 4, 5].map(el => {
		if (el > count) return <HiStar color="#CCCCCC" />;
		if (el <= count) return <HiStar color="#FF9700" />;
	});
};

export default Star;
