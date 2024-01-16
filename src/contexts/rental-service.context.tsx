import { createContext } from 'react';

import { RentalServiceInterface } from '@/services/rental-service.ts';

type RentalServiceContextType = {
	rentalService: RentalServiceInterface;
};

export const RentalServiceContext =
	createContext<RentalServiceContextType | null>(null);

export default function RentalServiceProvider({
	children,
	rentalService,
}: {
	children: React.ReactNode;
	rentalService: RentalServiceInterface;
}) {
	return (
		<RentalServiceContext.Provider value={{ rentalService }}>
			{children}
		</RentalServiceContext.Provider>
	);
}
