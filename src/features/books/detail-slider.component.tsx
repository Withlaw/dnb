import { HiArrowRight, HiArrowLeft } from 'react-icons/hi';
import Slick, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

type Props = {
	children?: React.ReactNode;
	options?: Settings;
	onClick?: () => void;
};

const BookImageSlider = ({ children, options }: Props) => {
	const defaultSettings: Settings = {
		speed: 1000,
		dots: true,
		infinite: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		// nextArrow: <NextArrow />,
		// prevArrow: <PrevArrow />,
		...options,
	};

	return (
		<Slick {...defaultSettings}>
			{/* {[].map(image => {
				return (
					<div>
						<figure className="flex justify-center bg-stone-200">
							<img
								className="h-80 w-64"
								src={book?.bookImageUrl}
								alt={book?.title}
							/>
						</figure>
					</div>
				);
			})} */}
			{children}
		</Slick>
	);
};

enum Style {
	CONTAINER = 'flex items-center justify-center bg-stone-200',
	ARROW = 'text-3xl hover:cursor-pointer',
}

function PrevArrow({ onClick }: Props) {
	return (
		<div className="flex flex-auto items-center justify-center">
			<span className={Style.ARROW} onClick={onClick}>
				<HiArrowLeft />
			</span>
		</div>
	);
}

function NextArrow({ onClick }: Props) {
	return (
		<div className="flex flex-auto items-center justify-center ">
			<span className={Style.ARROW} onClick={onClick}>
				<HiArrowRight />
			</span>
		</div>
	);
}

export default BookImageSlider;
