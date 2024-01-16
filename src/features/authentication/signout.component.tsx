import useLogout from '@/features/authentication/use-logout.hook.ts';

const SignOut = ({ children }: { children: React.ReactNode }) => {
	const { logout } = useLogout();

	const signoutHandler = () => {
		const isConfirmed = window.confirm('로그아웃 하시겠습니까?');
		if (!isConfirmed) return;

		logout();
	};

	return <span onClick={signoutHandler}>{children}</span>;
};

export default SignOut;
