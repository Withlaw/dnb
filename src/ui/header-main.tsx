type Props = {
	children: React.ReactNode;
};

const HeaderMain = ({ children }: Props) => {
	return (
		<header className="fixed z-[999] flex h-[50px] w-full max-w-screen-sm flex-initial items-center justify-between border-b border-solid border-stone-200 bg-[#fff] px-6 py-2">
			{children}
		</header>
	);
};

export default HeaderMain;
