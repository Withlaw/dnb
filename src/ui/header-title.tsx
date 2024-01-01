import { HiChevronLeft } from 'react-icons/hi';

type Props = {
	route?: 'home';
	title?: string;
};

const HeaderTitle = (props: Props) => {
	if (props.route === 'home')
		return (
			<div className="fixed inset-0 left-5 top-3">
				<span className="text-xl tracking-widest">동네북</span>
			</div>
		);
	else
		return (
			<div className="fixed inset-0 left-5 top-3">
				<span>
					<HiChevronLeft />
				</span>
				<span className="text-xl tracking-widest">동네북</span>
			</div>
		);
};

export default HeaderTitle;
