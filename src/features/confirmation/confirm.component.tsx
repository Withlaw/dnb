import { disableConfirm } from '@/features/confirmation/slice.ts';
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux.tsx';
import Modal from '@/ui/modal.tsx';

const Confirm = () => {
	const { message, isActive } = useAppSelector(state => state.confirmation);
	const dispatch = useAppDispatch();

	const confirmHandler = () => {
		// const callback = new Function(`return ${confirmCallback}`)();
		// console.log('confirmCallback: ', confirmCallback, 'coak:', callback);
		// callback();
		dispatch(disableConfirm());
	};
	const cancelHandler = () => {
		dispatch(disableConfirm());
	};

	if (!isActive) return null;

	return (
		<Modal>
			<Modal.Window name="">
				<div className="absolute top-10 flex w-full justify-center">
					<div className=" flex w-72 flex-col items-center justify-center rounded-md border border-stone-400 bg-[#fff] shadow-sm ">
						<div className="min-h-20 w-full p-4 text-sm">
							<p>{message}</p>
						</div>
						<div className=" flex w-full justify-center divide-x divide-stone-400 border-t border-stone-400 text-sm">
							<button
								onClick={cancelHandler}
								className="w-full rounded-bl-md p-1 text-center text-green-700 hover:bg-stone-50 ">
								취소
							</button>
							<button
								onClick={confirmHandler}
								className="w-full rounded-br-md bg-green-700 p-1 text-center text-stone-100 hover:bg-green-600">
								확인
							</button>
						</div>
					</div>
				</div>
			</Modal.Window>
		</Modal>
	);
};

export default Confirm;
