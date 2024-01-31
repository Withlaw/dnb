import { render, screen } from '@/features/users/__test__/utils.tsx';
import Authorization from '@/features/users/authorization.component.tsx';

describe('Authorizatoin', () => {
	test('guest only pages 렌더링', async () => {
		const Component = () => (
			<div>
				<h1>guest-only</h1>
			</div>
		);
		const route = {
			id: 'guest-only',
		};
		render(
			<Authorization route={route}>
				<Component />
			</Authorization>,
		);

		expect(
			await screen.findByRole('heading', { name: 'guest-only' }),
		).toBeInTheDocument();
	});

	test('protected pages 렌더링', async () => {
		const Component = () => (
			<div>
				<h1>protected</h1>
			</div>
		);
		const route = {
			id: 'protected',
		};
		render(
			<Authorization route={route}>
				<Component />
			</Authorization>,
		);

		expect(
			await screen.findByRole('heading', { name: 'protected' }),
		).toBeInTheDocument();
	});
});
