import { HiChevronLeft } from 'react-icons/hi';

const GeneralHeaderBack = ({ onClick }: { onClick: () => void }) => {
	return (
		<div className="min-w-4" onClick={onClick}>
			<span className="text-2xl hover:cursor-pointer">
				<HiChevronLeft />
			</span>
		</div>
	);
};

export default GeneralHeaderBack;
