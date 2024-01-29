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
	const [params, setParams] = useSearchParams();
	const currentField =
		params.get(field) ??
		options.filter(el => el.defalut)[0]?.value ??
		options[0].value;

	const tabClickHandler = (value: string) => {
		params.set(field, value);
		setParams(params);
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
