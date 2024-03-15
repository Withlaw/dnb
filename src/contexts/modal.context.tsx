import { createContext, useMemo } from 'react';

type ModalContextType = {
	name: string;
};

type ModalActionType = {
	open: React.Dispatch<React.SetStateAction<string>>;
	close: () => void;
};

type Props = {
	children: React.ReactNode;
	value: ModalContextType;
	action: ModalActionType;
};

export const ModalValueContext = createContext<ModalContextType | null>(null);
export const ModalActionContext = createContext<ModalActionType | null>(null);

export default function ModalProvider({ children, value, action }: Props) {
	const memoized = useMemo(() => action, []);
	return (
		<ModalValueContext.Provider value={value}>
			<ModalActionContext.Provider value={memoized}>
				{children}
			</ModalActionContext.Provider>
		</ModalValueContext.Provider>
	);
}
