import { useSearchParams } from 'react-router-dom';

type Option = {
	value: string;
	label: string;
	defalut?: boolean;
};

type Props = {
	field: string;
	options: Option[];
	render: (para: {
		option: Option;
		onClick: (value: string) => void;
		isActive: boolean;
	}) => JSX.Element;
	reset?: boolean;
};

const SearchParams = ({ field, options, render, reset = true }: Props) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const currentField =
		searchParams.get(field) ??
		options.filter(el => el.defalut)[0]?.value ??
		options[0].value;

	const clickHandler = (value: string) => {
		if (reset) {
			// 쿼리 스트링 초기화
			const curUrl = new URL(window.location.href);
			const curSearchParams = new URLSearchParams(curUrl.search);
			for (const key of curSearchParams.keys()) {
				searchParams.delete(key);
			}
		}

		searchParams.set(field, value);
		setSearchParams(searchParams);
	};

	return (
		<>
			{options.map(option => {
				const isActive = option.value === currentField;
				return render({ option, isActive, onClick: clickHandler });
			})}
		</>
	);
};

export default SearchParams;
