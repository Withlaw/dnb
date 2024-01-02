type Props = {
	children: React.ReactNode;
};

const Button = ({ children }: Props) => {
	return <button className="h-8 w-full bg-green-600">{children}</button>;
};

export default Button;
