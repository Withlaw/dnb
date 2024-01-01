import { HiChevronLeft } from 'react-icons/hi';
import { Link } from 'react-router-dom';

type Props = {
	isBooksPage?: boolean;
	title?: string;
};

const NavHeader = ({ isBooksPage = false, title = '동네북' }: Props) => {
	if (isBooksPage)
		return (
			<div>
				<span className="text-xl tracking-widest">{title}</span>
			</div>
		);
	else
		return (
			<div>
				<Link to={'..'} relative="path">
					<span className="text-2xl">
						<HiChevronLeft />
					</span>
				</Link>
			</div>
		);
};

export default NavHeader;
