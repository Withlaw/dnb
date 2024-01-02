import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

type Props = {
	children: React.ReactNode;
	onClose?: () => void;
};

export default function Modal({ children }: Props) {
	const dialog = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		// Using useEffect to sync the Modal component with the DOM Dialog API
		// This code will open the native <dialog> via it's built-in API whenever the <Modal> component is rendered
		const modal = dialog.current!;
		if (typeof modal.showModal !== 'function') {
			console.error('The <dialog> API is not supported by this browser');
			alert('허용되지 않은 접근입니다. 에러 메시지를 확인해주세요.');
			return;
		}
		modal.showModal();

		return () => {
			modal.close(); // needed to avoid error being thrown
		};
	}, []);

	return createPortal(
		// <dialog ref={dialog}>
		<dialog ref={dialog} autoFocus={false}>
			{children}
		</dialog>,
		document.getElementById('root')!,
	);
}

const BtnSubmit = ({ children }: Props) => {
	const btnClickHandler = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => {
		const isConfirmed = window.confirm('수정하시겠습니까?');
		if (!isConfirmed) e.preventDefault(); // 취소 응답시 form submit event 미발생
	};

	return (
		<button formMethod="dialog" onClick={btnClickHandler}>
			{children}
		</button>
	);
};

const BtnClose = ({ children, onClose }: Props) => {
	// 컨텍스트 만들어서 dialog 노드 공유해야할듯
	const btnClickHandler = () => {
		if (!onClose) return;
		onClose();
	};
	return <button onClick={btnClickHandler}>{children}</button>;
};

Modal.BtnSubmit = BtnSubmit;
Modal.BtnClose = BtnClose;
