type Props = {
	children: React.ReactNode;
	name: string;
};

const FormRow = ({ children, name }: Partial<Props>) => {
	return (
		<fieldset className="group mb-4 rounded-md border border-solid border-stone-400 bg-stone-100 px-2 has-[:focus]:border-stone-600">
			{name && (
				<legend className="px-1 text-xs  text-stone-400 ">{name}</legend>
			)}
			<div className="peer px-1 pb-2 *:w-full *:bg-stone-100 *:text-xs *:outline-none">
				{children}
			</div>
		</fieldset>
	);
};

export default FormRow;
