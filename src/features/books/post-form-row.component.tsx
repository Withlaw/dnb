import clsx from 'clsx';
import { HiExclamationCircle } from 'react-icons/hi';

type Props = {
	children: React.ReactNode;
	name?: string;
	message?: string;
};

const FormRow = ({ children, name, message }: Props) => {
	return (
		<fieldset
			className={clsx(
				'my-2 rounded-md border border-solid p-3 ',
				message && 'border-red-300 ',
				message || 'border-stone-300 ',
			)}>
			{name && (
				<legend className="flex items-center px-1 text-sm">
					{name}
					{message && (
						<>
							<span className="ml-2 text-red-600">
								<HiExclamationCircle />
							</span>
							<span className="text-red-600">
								<span className="">{message}</span>
							</span>
						</>
					)}
				</legend>
			)}

			{children}
		</fieldset>
	);
};

export default FormRow;
