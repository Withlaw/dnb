import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

type Props = {
	children: React.ReactNode;
	className?: string;
	onClose?: () => void;
};
export default function Modal({ children, onClose, className = '' }: Props) {
	useEffect(() => {
		// esc 누르면 창닫기 구현하기
	}, []);

	const overlayClickHandler = () => {
		if (!onClose) return;
		onClose();
	};

	return createPortal(
		<div className="flex items-center justify-center">
			<div className={'fixed z-[101] bg-inherit ' + className}>{children}</div>
			<div
				className="fixed inset-0 z-[100] h-[100%] w-[100%] backdrop-blur-sm"
				onClick={overlayClickHandler}></div>
		</div>,
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
	// 굳이 없어도 될 듯? close 로직을 외부에서 주입받는데, 그냥 외부에서 버튼 만들고 바로 state 렌더링 로직으로 close 구현할 수 있으니..
	const btnClickHandler = () => {
		if (!onClose) return;
		onClose();
	};
	return (
		<button onClick={btnClickHandler} className="bg-red-300">
			{children}
		</button>
	);
};

Modal.BtnSubmit = BtnSubmit;
Modal.BtnClose = BtnClose;

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
