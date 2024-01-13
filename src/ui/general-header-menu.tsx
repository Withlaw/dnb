import { HiOutlineX, HiMenu } from 'react-icons/hi';

type Props = {
	children: React.ReactNode;
	isShowMenu: boolean;
	onClick: () => void;
};

const GeneralHeaderMenu = ({ children, onClick, isShowMenu }: Props) => {
	return (
		<div className="relative flex items-center justify-end">
			<span className="ml-4 hover:cursor-pointer" onClick={onClick}>
				<HiMenu size="24" />
			</span>
			{isShowMenu && (
				<div className="absolute top-[34px] flex flex-col items-center rounded-md border border-solid bg-[#fff] p-1">
					<div className="relative h-1 w-full">
						<span
							className="absolute right-1 text-lg hover:cursor-pointer"
							onClick={onClick}>
							<HiOutlineX />
						</span>
					</div>
					<div className="flex w-24 flex-col items-center divide-y  ">
						{children}
					</div>
				</div>
			)}
		</div>
	);
};

GeneralHeaderMenu.Item = ({ children }: Partial<Props>) => (
	<div className="flex w-full items-center space-x-1 px-2 py-1 text-sm hover:cursor-pointer hover:text-stone-600">
		{children}
	</div>
);

export default GeneralHeaderMenu;
