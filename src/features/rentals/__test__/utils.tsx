import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RenderOptions, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import RentalServiceProvider from '@/contexts/rental-service.context.tsx';
import RentalService from '@/services/rental-service.ts';

const queryClient = new QueryClient();
const rentalService = new RentalService();

const Providers = ({ children }: { children: React.ReactNode }) => (
	<QueryClientProvider client={queryClient}>
		<RentalServiceProvider rentalService={rentalService}>
			<BrowserRouter>{children}</BrowserRouter>
		</RentalServiceProvider>
	</QueryClientProvider>
);

const customRender = (
	ui: React.ReactElement,
	options?: Omit<RenderOptions, 'queries'>,
) => render(ui, { wrapper: Providers, ...options });

export * from '@testing-library/react';

export { customRender as render };
