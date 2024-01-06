type Props = {
	children: React.ReactNode;
	className?: string;
};

const DetailRow = ({ children }: Props) => {
	return (
		<div className="flex justify-between border-b border-solid py-3">
			{children}
		</div>
	);
};

export default DetailRow;

const Span = ({ children, className }: Props) => {
	return <span className={'mx-1 ' + className}>{children}</span>;
};

DetailRow.Span = Span;
