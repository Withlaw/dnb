import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

type Props = {
	children: React.ReactNode;
	onClose?: () => void;
};

export default function Modal({ children, onClose }: Props) {
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
		// <dialog className="modal" ref={dialog} onClose={onClose}>
		<dialog
			ref={dialog}
			onClose={() => {
				console.log('modal closed');
			}}
			onClick={() => {
				console.log('modal click');
			}}>
			{children}
		</dialog>,
		document.getElementById('root')!,
	);
}

const SubmitButton = ({ children }: Props) => {
	return <button formMethod="dialog">{children}</button>;
};

const CloseButton = ({ children }: Props) => {
	// 컨텍스트 만들어서 dialog 노드 공유해야할듯
	return <button>{children}</button>;
};

Modal.SubmitButton = SubmitButton;
Modal.CloseButton = CloseButton;
