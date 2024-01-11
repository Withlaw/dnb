type Prop = { children: React.ReactNode };

const GeneralLayout = ({ children }: Prop) => {
	return (
		<div className="container mx-auto flex h-dvh max-w-screen-sm flex-col shadow-xl md:w-96 ">
			{children}
		</div>
	);
};

export default GeneralLayout;
