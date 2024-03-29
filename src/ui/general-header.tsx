type Props = {
	children: React.ReactNode;
};

const GeneralHeader = ({ children }: Props) => {
	return (
		<header
			className={
				'fixed z-[99] flex h-[50px] w-full max-w-screen-sm flex-initial items-center justify-between border-b border-solid border-stone-200 bg-[#fff] px-6 py-2 md:w-96 '
			}>
			{children}
		</header>
	);
};

export default GeneralHeader;
