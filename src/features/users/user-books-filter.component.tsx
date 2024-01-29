import { useSearchParams } from 'react-router-dom';

type Props = {
	options: {
		value: string;
		label: string;
	}[];
};

const UserBooksFilter = ({ options }: Props) => {
	const [searchParams, setSearchParams] = useSearchParams();

	const selectChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = e.target;
		searchParams.set('filter', value);
		setSearchParams(searchParams);
	};

	return (
		<select
			className="bg-inherit text-xs outline-green-700 hover:cursor-pointer"
			onChange={selectChangeHandler}>
			{options.map(option => {
				return (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				);
			})}
		</select>
	);
};

export default UserBooksFilter;
