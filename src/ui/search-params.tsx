import { cloneElement } from 'react';
import { useSearchParams } from 'react-router-dom';

type Option = {
	value: string;
	label: string;
	defalut?: boolean;
};

type SearchParamsRenderFunction = (data: {
	// option: Option;
	options: Option[];
	currentField: string;
	onSearch: (value: string) => void;
	// isActive: boolean;
}) => React.ReactNode;

type Props = {
	children: React.ReactElement | SearchParamsRenderFunction;
	field: string;
	options: Option[];
	reset?: boolean;
};

const SearchParams = ({ field, options, children, reset = true }: Props) => {
	// render props 패턴으로 구현했지만 커스텀 훅이 더 간단해 보인다.
	const [searchParams, setSearchParams] = useSearchParams();
	const currentField =
		searchParams.get(field) ??
		options.filter(el => el.defalut)[0]?.value ??
		options[0].value;

	const searchParamsHandler = (value: string) => {
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

	const render =
		typeof children === 'function'
			? children({ options, currentField, onSearch: searchParamsHandler })
			: cloneElement(children, {
					options,
					currentField,
					onSearch: searchParamsHandler,
				});

	return <>{render}</>;

	// return cloneElement(
	// 	wrapper,
	// 	// { onClick: clickHandler, onChange: clickHandler },
	// 	...options.map(option => {
	// 		const isActive = option.value === currentField;
	// 		return render({ option, isActive, onClick: clickHandler });
	// 	}),
	// );
	// return (
	// 	<>
	// {options.map(option => {
	// 	const isActive = option.value === currentField;
	// 	return render({ option, isActive, onClick: clickHandler });
	// })}
	// 	</>
	// );
};

export default SearchParams;
