import { RenderOptions, render } from '@testing-library/react';
import { Provider } from 'react-redux';

import store from '@/store.ts';

const Providers = ({ children }: { children: React.ReactNode }) => (
	<Provider store={store}>{children}</Provider>
);

const customRender = (
	ui: React.ReactElement,
	options?: Omit<RenderOptions, 'queries'>,
) => render(ui, { wrapper: Providers, ...options });

export * from '@testing-library/react';

export { customRender as render };
