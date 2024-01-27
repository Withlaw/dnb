import { cloneElement, useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { useModal } from '@/contexts/index.ts';
import ModalProvider from '@/contexts/modal.context.tsx';

type Props = {
	children: React.ReactElement;
	name?: string;
	htmlFor?: string;
};

export default function Modal({ children }: Props) {
	const [name, setName] = useState('');

	const open = useCallback(setName, []);
	const close = useCallback(() => setName(''), []);

	useEffect(() => {
		// esc 누르면 창닫기 구현하기
	}, []);

	return (
		<ModalProvider value={{ name, open, close }}>{children}</ModalProvider>
	);
}

const Window = ({ children, name = '' }: Props) => {
	const { name: curWindowName, close } = useModal();

	if (name !== curWindowName) return null;

	return createPortal(
		<div className="fixed inset-0 z-[100]">
			<div className="relative z-[101]">
				{/* <div className={'fixed z-[101] h-[100%] w-[100%] bg-inherit bg-red-300'}> */}
				{cloneElement(children, { onClose: close })}
			</div>
			<div className="fixed h-full w-full backdrop-blur-sm">
				{/* <div className="fixed inset-0 z-[100] h-[100%] w-[100%] backdrop-blur-sm"> */}
				{/* overlay */}
			</div>
		</div>,
		document.body,
	);
};

const Trigger = ({ children, htmlFor = '' }: Props) => {
	const { open } = useModal();

	return cloneElement(children, { onOpen: () => open(htmlFor) });
};

Modal.Window = Window;
Modal.Trigger = Trigger;

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
