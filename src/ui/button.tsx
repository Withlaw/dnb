type Props = {
	children: React.ReactNode;
	onClick?: () => void;
	options?: {
		disabled?: boolean;
	};
};

const Button = ({ children, options, onClick }: Props) => {
	return (
		<button
			className="h-8 w-full rounded-md border border-green-500 bg-green-700 text-center text-sm text-stone-50 outline-none hover:bg-green-700/90 focus:ring-2 focus:ring-green-900/70 focus:ring-offset-1 disabled:cursor-default disabled:border-none disabled:bg-gray-500 disabled:ring-0 disabled:focus:ring-offset-0"
			onClick={onClick}
			{...options}>
			{children}
		</button>
	);
};

export default Button;
