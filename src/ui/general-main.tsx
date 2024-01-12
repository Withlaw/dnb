type Prop = { children: React.ReactNode };

const GeneralMain = ({ children }: Prop) => (
	<main className="flex-auto bg-stone-50 px-4 py-[58px]">{children}</main>
);

export default GeneralMain;
