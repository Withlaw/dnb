import { cloneElement, useCallback, useEffect, useRef, useState } from 'react';

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
}: {
	children: React.ReactElement;
	name: string;
}) => {
	const ref = useRef<HTMLDivElement>(null);

	const { name: curWindowName, close } = useModal();

	useEffect(() => {
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

	if (name !== curWindowName) return null;

	return <div ref={ref}>{cloneElement(children, { onClose: close })}</div>;
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

DropDown.Window = Window;
DropDown.Trigger = Trigger;

export default DropDown;
