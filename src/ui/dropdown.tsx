import { cloneElement, useCallback, useEffect, useState } from 'react';

import { useModal } from '@/contexts/index.ts';
import ModalProvider from '@/contexts/modal.context.tsx';

const DropDown = ({ children }: { children: React.ReactNode }) => {
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
	// isClosingWhenClickOutside,
}: {
	children: React.ReactElement;
	name: string;
	isClosingWhenClickOutside?: boolean;
}) => {
	const { name: curWindowName, close } = useModal();

	/*
  // Window 컴포넌트트의 제어권을 외부에 넘기기 위해서는 html 요소를 반환하면 안된다.
  // 근데 내부에서 html요소를 갖지 못하면 ref를 주입받거나 props로 내려줘야 하는데
  // 외부에서 ref를 주입받으려면 제너릭 타입 설정 및 드랍다운 ui를 사용할 때 useRef를 함께 써줘야 하는 번거로움이 존재
  // props로 children에 내려주려면 children 에서 forwardRef를 사용해야 하는데 이도 번거로움...
	const ref = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (!isClosingWhenClickOutside) return;

		// 윈도우 외 영역을 클릭하면 윈도우 닫힘

		const outsideClickHandler = (e: MouseEvent) => {
			if (
				!ref.current ||
				!(e.target instanceof Element) ||
				ref.current.contains(e.target)
			)
				return;

			close();
		};

		document.addEventListener('click', outsideClickHandler, true);

		return () =>
			document.removeEventListener('click', outsideClickHandler, true);
	}, []);
  */

	if (name !== curWindowName) return null;

	return cloneElement(children, { onClose: close });
};

const Trigger = ({
	children,
	htmlFor,
}: {
	children: React.ReactElement;
	htmlFor: string;
}) => {
	const { open, close } = useModal();

	return cloneElement(children, {
		onOpen: () => open(htmlFor),
		onClose: close,
	});
};

DropDown.Window = Window;
DropDown.Trigger = Trigger;

export default DropDown;
