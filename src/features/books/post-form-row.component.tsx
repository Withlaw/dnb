// enum Style {
// 	CARD = 'border border-solid border-stone-300 rounded-md my-3 p-3',
// 	INPUT = 'bg-inherit px-1 pb-1 text-lg outline-none',
// 	INPUTCONTAINER = 'flex items-center justify-between',
// 	LEGEND = 'px-1 text-sm',
// }

type Props = {
	children: React.ReactNode;
	name?: string;
};

const FormRow = ({ children, name }: Props) => {
	return (
		<fieldset className="my-2 rounded-md border border-solid border-stone-300 p-3">
			{name && <legend className="px-1 text-sm">{name}</legend>}
			{children}
		</fieldset>
	);
};

export default FormRow;
