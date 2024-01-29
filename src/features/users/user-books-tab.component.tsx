import clsx from 'clsx';

import SearchParams from '@/ui/search-params.tsx';

const UserBooksTab = () => {
	return (
		<SearchParams
			field="books"
			options={[
				{ value: 'own', label: '등록한 책' },
				{ value: 'rent', label: '빌린 책' },
				// { value: 'wish', label: '찜한 책' },
			]}
			render={({ option, isActive, onClick }) => (
				<button
					key={option.value}
					onClick={() => onClick(option.value)}
					className={clsx(
						'px-2 text-stone-600 hover:cursor-pointer hover:text-inherit',
						isActive && 'text-inherit',
					)}>
					{option.label}
				</button>
			)}
		/>
	);
};

export default UserBooksTab;
