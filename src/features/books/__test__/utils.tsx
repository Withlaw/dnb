import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RenderOptions, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			gcTime: 0,
		},
	},
});

const Providers = ({ children }: { children: React.ReactNode }) => (
	<QueryClientProvider client={queryClient}>
		<BrowserRouter>{children}</BrowserRouter>
	</QueryClientProvider>
);

const customRender = (
	ui: React.ReactElement,
	options?: Omit<RenderOptions, 'queries'>,
) => render(ui, { wrapper: Providers, ...options });

export * from '@testing-library/react';

export { customRender as render };
