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
			className="h-8 w-full rounded-md border border-green-500 bg-green-700 text-center text-sm text-stone-50 outline-none hover:bg-green-700/90 focus:ring-2 focus:ring-green-900/70 focus:ring-offset-1"
			onClick={onClick}
			{...options}>
			{children}
		</button>
	);
};

export default Button;
