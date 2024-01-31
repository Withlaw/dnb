import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RenderOptions, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import AuthServiceProvider from '@/contexts/auth-service.context.tsx';
import AuthService from '@/services/auth-service.ts';
import store from '@/store.ts';

const queryClient = new QueryClient();
const authService = new AuthService();

const Providers = ({ children }: { children: React.ReactNode }) => (
	<Provider store={store}>
		<QueryClientProvider client={queryClient}>
			<AuthServiceProvider authService={authService}>
				<BrowserRouter>{children}</BrowserRouter>
			</AuthServiceProvider>
		</QueryClientProvider>
	</Provider>
);

const customRender = (
	ui: React.ReactElement,
	options?: Omit<RenderOptions, 'queries'>,
) => render(ui, { wrapper: Providers, ...options });

export * from '@testing-library/react';

export { customRender as render };
