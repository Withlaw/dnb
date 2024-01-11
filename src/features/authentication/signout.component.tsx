import useLogout from '@/features/authentication/use-logout.hook.ts';

const SignOut = () => {
	const { logout, isLoading } = useLogout();

	const signoutHandler = () => {
		const isConfirmed = window.confirm('로그아웃 하시겠습니까?');
		if (!isConfirmed) return;

		logout();
	};

	return (
		<button onClick={signoutHandler} disabled={isLoading}>
			로그아웃
		</button>
	);
};

export default SignOut;
