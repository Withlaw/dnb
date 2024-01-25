import clsx from 'clsx';
import { createPortal } from 'react-dom';
import { HiOutlineX, HiCheckCircle, HiExclamationCircle } from 'react-icons/hi';

type Props = {
	message: string;
	type: 'success' | 'error';
	onClose?: () => void;
};

const Toast = ({ message, type, onClose }: Props) => {
	const isSuccess = type === 'success';
	const isError = type === 'error';

	const closeHandler = () => {
		if (onClose) onClose();
	};

	return createPortal(
		<div className="fixed bottom-20 z-[9990] flex w-full justify-center ">
			<div className="flex-col space-y-2">
				<div className=" flex h-10 items-center justify-between space-x-4 rounded-lg border border-solid bg-[#fff] px-4 py-2 shadow-lg">
					<div className="flex items-center space-x-2">
						<span
							className={clsx('text-lg', {
								'text-green-600': isSuccess,
								'text-red-600': isError,
							})}>
							{isSuccess && <HiCheckCircle />}
							{isError && <HiExclamationCircle />}
						</span>
						<span className="max-w-52 truncate text-xs">
							{message}
							ㅇ너ㅏj
						</span>
					</div>

					<div>
						<span
							className="text-sm hover:cursor-pointer"
							onClick={closeHandler}>
							<HiOutlineX />
						</span>
					</div>
				</div>
			</div>
		</div>,
		document.getElementById('root')!,
	);
};

export default Toast;
