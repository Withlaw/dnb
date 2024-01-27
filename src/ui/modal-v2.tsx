import {
	cloneElement,
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';
import { createPortal } from 'react-dom';

type Props = {
	children: React.ReactElement;
	name?: string;
	htmlFor?: string;
};

type ModalContextType = {
	name: string;
	open: React.Dispatch<React.SetStateAction<string>>;
	close: () => void;
};

const ModalContext = createContext<ModalContextType | null>(null);
const useModal = () => {
	const value = useContext(ModalContext);
	if (!value) throw new Error('useContext needs ModalContextProvider.');

	return value;
};

export default function Modal2({ children }: Props) {
	const [name, setName] = useState('');

	const open = useCallback(setName, []);
	const close = useCallback(() => setName(''), []);

	useEffect(() => {
		// esc 누르면 창닫기 구현하기
	}, []);

	return (
		<ModalContext.Provider value={{ name, open, close }}>
			{children}
		</ModalContext.Provider>
	);
}

const Window = ({ children, name }: Required<Props>) => {
	const { name: curWindowName, close } = useModal();

	if (name !== curWindowName) return null;

	return createPortal(
		<div className="flex items-center justify-center">
			<div className={'fixed z-[101] bg-inherit '}>
				{cloneElement(children, { onClose: close })}
			</div>
			<div className="fixed inset-0 z-[100] h-[100%] w-[100%] backdrop-blur-sm">
				{/* overlay */}
			</div>
		</div>,
		document.body,
	);
};

const Trigger = ({ children, htmlFor }: Required<Props>) => {
	const { open } = useModal();

	return cloneElement(children, { onOpen: () => open(htmlFor) });
};

Modal2.Window = Window;
Modal2.Trigger = Trigger;
