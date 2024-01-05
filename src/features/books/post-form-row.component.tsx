import { HiExclamationCircle } from 'react-icons/hi';

type Props = {
	children: React.ReactNode;
	name?: string;
	className?: string;
	isError?: boolean;
};

const FormRow = ({ children, name, className, isError }: Props) => {
	return (
		<fieldset
			className={
				'my-2 rounded-md border border-solid border-stone-300 p-3 ' + className
			}>
			{name && (
				<legend className="flex items-center px-1 text-sm">
					{name}
					{isError && (
						<>
							{' '}
							<span className="ml-2 text-red-600">
								<HiExclamationCircle />
							</span>
							<span className="text-red-600">
								<span className="">작성해주세요</span>
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
