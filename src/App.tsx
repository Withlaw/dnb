import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import AuthServiceProvider from '@/contexts/auth-service.context.tsx';
import RentalServiceProvider from '@/contexts/rental-service.context.tsx';
import UserServiceProvider from '@/contexts/user-service.context.tsx';
import router from '@/routers/index.tsx';
import AuthService from '@/services/auth-service.ts';
import RentalService from '@/services/rental-service.ts';
import UserService from '@/services/user-service.ts';
import store from '@/store.ts';

const userService = new UserService();
const authService = new AuthService();
const rentalService = new RentalService();

const ContextProviders = ({ children }: { children: React.ReactNode }) => (
	<AuthServiceProvider authService={authService}>
		<UserServiceProvider userService={userService}>
			<RentalServiceProvider rentalService={rentalService}>
				{children}
			</RentalServiceProvider>
		</UserServiceProvider>
	</AuthServiceProvider>
);

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			// staleTime: 60 * 1000,
			staleTime: 0, // Query is configured with aggressive
			retry: false,
		},
	},
});

function App() {
	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<ContextProviders>
					<RouterProvider router={router} />
				</ContextProviders>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</Provider>
	);
}

export default App;
