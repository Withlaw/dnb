import { cloneElement, useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { useModal } from '@/contexts/index.ts';
import ModalProvider from '@/contexts/modal.context.tsx';

const Modal = ({ children }: { children: React.ReactNode }) => {
	const [name, setName] = useState('');

	const open = useCallback(setName, []);
	const close = useCallback(() => setName(''), []);

	return (
		<ModalProvider value={{ name, open, close }}>{children}</ModalProvider>
	);
};

const Window = ({
	children,
	name,
	blured = true,
}: {
	children: React.ReactElement;
	name: string;
	blured?: boolean;
}) => {
	const { name: curWindowName, close } = useModal();

	useEffect(() => {
		// esc 모달 창 닫기 기능
		const keystrokeEventHandler = (e: KeyboardEvent) => {
			const { key } = e;
			if (key !== 'Escape') return;

			close();
		};

		document.addEventListener('keyup', keystrokeEventHandler);
		return () => document.removeEventListener('keyup', keystrokeEventHandler);
	}, []);

	useEffect(() => {
		if (name !== curWindowName) return;

		document.body.style.overflow = 'hidden';

		return () => {
			document.body.style.overflow = 'auto';
		};
	}, [curWindowName]);

	if (name !== curWindowName) return null;

	return createPortal(
		<div className="fixed inset-0 z-[100]">
			<div className="relative z-[101]">
				{cloneElement(children, { onClose: close })}
			</div>
			<div
				className={`fixed h-full w-full ${blured ?? 'backdrop-blur-sm'}`}
				onClick={close}>
				{/* overlay */}
			</div>
		</div>,
		document.body,
	);
};

const Trigger = ({
	children,
	htmlFor,
}: {
	children: React.ReactElement;
	htmlFor: string;
}) => {
	const { open } = useModal();

	return cloneElement(children, { onOpen: () => open(htmlFor) });
};

Modal.Window = Window;
Modal.Trigger = Trigger;

export default Modal;

/*
// 웹 표준으로 지원하는 dialog 모달을 구현하다보니 스타일 적용하는 것과 동작 제어가 예상치 못한 것이 많고 리액트와도 불협화음도 있는 것 같아 사용하지 않게 됨.
// form 요소 autofocus 라든지, esc누르면 모달창 닫히는 기능이라든지 등등
export default function Modal({ children, onClose, className = '' }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);

	const dialogClickHandler = (
		e: React.MouseEvent<HTMLDialogElement, MouseEvent>,
	) => {
		if (!onClose) return;
		const dialogRect = e.currentTarget.getBoundingClientRect();
		if (
			dialogRect.left > e.clientX ||
			dialogRect.right < e.clientX ||
			dialogRect.top > e.clientY ||
			dialogRect.bottom < e.clientY
		) {
			// dialog 외부 요소 클릭시 닫힘
			// dialog.current?.close();
			onClose();
		}
	};

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
			modal.close(); // needed to avoid error being thrown.
		};
	}, []);


	return createPortal(
		//  <dialog ref={dialog}>
		<dialog
			// ref={dialog}
			// onClick={dialogClickHandler}
			className={'bg-inherit ' + className}
			autoFocus={false}
			// onClose={() => {
			// 	console.log('closed');
			// }}
			// onCancel={() => {
			// 	console.log('canceled');
			// }}
		>
			{children}
		</dialog>,
		document.getElementById('root')!,
	);
}
*/
