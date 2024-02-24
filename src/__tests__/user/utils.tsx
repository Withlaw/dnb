import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RenderOptions, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from '@/store.ts';

// 리액트 쿼리 테스트 할 때 캐시 기능이 다음 테스트에 영향을 미치지 않도록 캐시 gcTime을 0으로 설정
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			gcTime: 0,
		},
	},
});

const Providers = ({ children }: { children: React.ReactNode }) => (
	<Provider store={store}>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>{children}</BrowserRouter>
		</QueryClientProvider>
	</Provider>
);

const customRender = (
	ui: React.ReactElement,
	options?: Omit<RenderOptions, 'queries'>,
) => render(ui, { wrapper: Providers, ...options });

export * from '@testing-library/react';

export { customRender as render };
