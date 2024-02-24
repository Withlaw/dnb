import SearchParams from '@/ui/search-params.tsx';

type Props = {
	options: {
		value: string;
		label: string;
	}[];
};

const UserBooksFilter = ({ options }: Props) => {
	return (
		<SearchParams field="filter" options={options} reset={false}>
			{({ options, onSearch }) => (
				<select
					className="bg-inherit text-xs outline-green-700 hover:cursor-pointer"
					onChange={e => onSearch(e.target.value)}>
					{options.map(option => {
						return (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						);
					})}
				</select>
			)}
		</SearchParams>
	);

	// return (
	// <select
	// 	className="bg-inherit text-xs outline-green-700 hover:cursor-pointer"
	// 	onChange={selectChangeHandler}>
	// 	{options.map(option => {
	// 		return (
	// <option key={option.value} value={option.value}>
	// 	{option.label}
	// </option>
	// 		);
	// 	})}
	// </select>
	// );
};

export default UserBooksFilter;
