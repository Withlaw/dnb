import { createContext } from 'react';

type ModalContextType = {
	name: string;
	open: React.Dispatch<React.SetStateAction<string>>;
	close: () => void;
};

type Props = {
	children: React.ReactNode;
	value: ModalContextType;
};

export const ModalContext = createContext<ModalContextType | null>(null);

export default function ModalProvider({ children, value }: Props) {
	return (
		<ModalContext.Provider value={{ ...value }}>
			{children}
		</ModalContext.Provider>
	);
}
