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
				{/* 홈페이지(books page)일 경우 title 표기 */}
				<span className="text-xl tracking-widest">{title}</span>
			</div>
		);
	else
		return (
			<div>
				{/* 홈페이지가 아닐 경우 뒤로가기 버튼 */}
				<Link to=".." relative="path">
					<span className="text-2xl">
						<HiChevronLeft />
					</span>
				</Link>
			</div>
		);
};

export default NavHeader;
