import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RenderOptions, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import UserServiceProvider from '@/contexts/user-service.context.tsx';
import { UserServiceTest } from '@/services/user-service.ts';
import store from '@/store.ts';

const queryClient = new QueryClient();
const userService = new UserServiceTest();

const Providers = ({ children }: { children: React.ReactNode }) => (
	<Provider store={store}>
		<QueryClientProvider client={queryClient}>
			<UserServiceProvider userService={userService}>
				<BrowserRouter>{children}</BrowserRouter>
			</UserServiceProvider>
		</QueryClientProvider>
	</Provider>
);

const customRender = (
	ui: React.ReactElement,
	options?: Omit<RenderOptions, 'queries'>,
) => render(ui, { wrapper: Providers, ...options });

export * from '@testing-library/react';

export { customRender as render };
