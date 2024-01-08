type Props = {
	children: React.ReactNode;
	className?: string;
};

const DetailRow = ({ children }: Props) => {
	return (
		<div className="flex justify-between border-b border-solid py-4">
			{children}
		</div>
	);
};

const Span = ({ children, className }: Props) => {
	return <span className={'mx-1 ' + className}>{children}</span>;
};

DetailRow.Span = Span;

export default DetailRow;
