import { HiOutlineX, HiMenu } from 'react-icons/hi';

import DropDown from '@/ui/dropdown.tsx';

const GeneralHeaderMenu = ({ children }: { children: React.ReactNode }) => {
	return (
		<DropDown>
			<div className="relative flex items-center justify-end">
				<DropDown.Trigger htmlFor="menu">
					<GeneralHeaderMenuButton />
				</DropDown.Trigger>

				<DropDown.Window name="menu">
					<GeneralHeaderMenuUl>{children}</GeneralHeaderMenuUl>
				</DropDown.Window>
			</div>
		</DropDown>
	);
};

function GeneralHeaderMenuButton({
	icon,
	onOpen,
}: {
	icon?: React.ReactElement;
	onOpen?: () => void;
}) {
	return (
		<span className="ml-4 hover:cursor-pointer" onClick={onOpen}>
			<HiMenu size="24" />
		</span>
	);
}

function GeneralHeaderMenuUl({
	children,
	onClose,
	ref,
}: {
	children: React.ReactNode;
	onClose?: () => void;
	ref?: React.RefObject<HTMLDivElement>;
}) {
	return (
		<div
			ref={ref}
			className="absolute top-[34px] flex flex-col items-center rounded-md border border-solid bg-[#fff] p-1">
			<div className="relative h-2 w-full">
				<span
					className="text-md absolute right-1 hover:cursor-pointer"
					onClick={onClose}>
					<HiOutlineX />
				</span>
			</div>

			<div className="flex w-24 flex-col items-center divide-y  ">
				{children}
			</div>
		</div>
	);
}

GeneralHeaderMenu.Item = ({ children }: { children: React.ReactNode }) => (
	<div className="flex w-full items-center space-x-1 px-2 py-1 text-sm hover:cursor-pointer hover:text-stone-600">
		{children}
	</div>
);

export default GeneralHeaderMenu;
