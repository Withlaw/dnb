type Props = {
	children: React.ReactNode;
	name?: string;
};

const FormRow = ({ children, name }: Props) => {
	return (
		<div className="m-2 flex items-center">
			{name && (
				<label htmlFor={name} className="w-32 flex-initial text-sm capitalize">
					{name}
				</label>
			)}
			<div className="flex-auto *:w-full *:border *:border-solid *:p-2 *:text-sm">
				{children}
			</div>
		</div>
	);
};

export default FormRow;
