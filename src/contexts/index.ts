import { useContext } from 'react';

import { AuthServiceContext } from '@/contexts/auth-service.context.tsx';
import { BookServiceContext } from '@/contexts/book-service.context.tsx';
import {
	ModalActionContext,
	ModalValueContext,
} from '@/contexts/modal.context.tsx';
import { RentalServiceContext } from '@/contexts/rental-service.context.tsx';
import { UserServiceContext } from '@/contexts/user-service.context.tsx';

// Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components.

// Fast refresh 기능을 위해 컨텍스트 프로바이더 컴포넌트와 컨텍스트 훅을 분리함.

export const useBookService = () => {
	const value = useContext(BookServiceContext);
	if (!value) throw new Error('useBookService need BookServiceProvider.');

	return value.bookService;
};

export const useRentalService = () => {
	const value = useContext(RentalServiceContext);
	if (!value) throw new Error('useRentalService need RentalServiceProvider.');

	return value.rentalService;
};

export const useAuthService = () => {
	const value = useContext(AuthServiceContext);
	if (!value) throw new Error('useAuthService need AuthServicesProvider.');

	return value.authService;
};

export const useUserService = () => {
	const value = useContext(UserServiceContext);
	if (!value) throw new Error('useUserService need UserServicesProvider.');

	return value.userService;
};

export const useModal = () => {
	const value = useContext(ModalValueContext);
	const action = useContext(ModalActionContext);

	if (!value || !action)
		throw new Error('useModal needs ModalContextProvider.');

	return { ...value, ...action };
};
