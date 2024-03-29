import { useEffect } from 'react';
import { createPortal } from 'react-dom';

type Props = {
	children: React.ReactNode;
	className?: string;
	onClose?: () => void;
};
export default function ModalLegacy({
	children,
	onClose,
	className = '',
}: Props) {
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

ModalLegacy.BtnSubmit = BtnSubmit;
ModalLegacy.BtnClose = BtnClose;
