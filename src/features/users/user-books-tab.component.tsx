import clsx from 'clsx';

import SearchParams from '@/ui/search-params.tsx';

type Props = {
	options: {
		value: string;
		label: string;
	}[];
};

const UserBooksTab = ({ options }: Props) => {
	return (
		<SearchParams field="books" options={options}>
			{({ options, currentField, onSearch }) =>
				options.map(option => {
					const isActive = option.value === currentField;
					console.log('option', option, currentField, isActive);

					return (
						<button
							key={option.value}
							onClick={() => onSearch(option.value)}
							className={clsx(
								'px-2  hover:cursor-pointer hover:text-inherit',
								isActive ? 'text-inherit' : 'text-stone-600',
							)}>
							{option.label}
						</button>
					);
				})
			}
		</SearchParams>
	);
};

export default UserBooksTab;
