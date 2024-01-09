import clsx from 'clsx';
import { HiExclamationCircle } from 'react-icons/hi';

type Props = {
	children: React.ReactNode;
	name: string;
	message?: string;
};

const FormRow = ({ children, name, message }: Partial<Props>) => {
	return (
		<fieldset
			className={clsx(
				'group mb-4 rounded-md border border-solid bg-stone-100 px-2 ',
				message && 'border-red-300 bg-red-50 has-[:focus]:border-red-500 ',
				message || 'border-stone-400 has-[:focus]:border-stone-600 ',
			)}>
			{name && (
				<legend className="flex items-center px-1 text-xs capitalize text-stone-400">
					{name}
					{message && (
						<>
							<span className="m-1 text-[0.6rem] text-red-400">
								<HiExclamationCircle />
							</span>
							<span className="text-[0.6rem] text-red-400">{message}</span>
						</>
					)}
				</legend>
			)}
			<div
				className={clsx(
					'peer px-1 pb-2 *:w-full *:text-xs *:outline-none',
					message && '*:bg-red-50',
					message || '*:bg-stone-100',
				)}>
				{children}
			</div>
		</fieldset>
	);
};

export default FormRow;
