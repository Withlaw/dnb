type Props = {
	children: React.ReactNode;
	onClick?: () => void;
	options?: {
		disabled?: boolean;
	};
};

const Button = ({ children, options, onClick }: Props) => {
	return (
		<button className="h-8 w-full bg-green-600" onClick={onClick} {...options}>
			{children}
		</button>
	);
};

export default Button;
