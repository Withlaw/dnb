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
};

const Tab = ({ field, options, render }: Props) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const currentField =
		searchParams.get(field) ??
		options.filter(el => el.defalut)[0]?.value ??
		options[0].value;

	const tabClickHandler = (value: string) => {
		for (const key of searchParams.keys()) {
			console.log(key);
			searchParams.delete(key);
		}
		searchParams.set(field, value);
		setSearchParams(searchParams);
	};

	return (
		<>
			{options.map(option => {
				const isActive = option.value === currentField;
				return render({ option, isActive, onClick: tabClickHandler });
			})}
		</>
	);
};

export default Tab;
