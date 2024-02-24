import useLogout from '@/features/authentication/logout/use-logout.hook.ts';
import useConfirm from '@/hooks/use-confirm.ts';

const SignOut = ({ children }: { children: React.ReactNode }) => {
	const { logout } = useLogout();
	const { confirm } = useConfirm();

	const signoutHandler = () => {
		confirm('로그아웃 하시겠습니까?', () => {
			logout();
		});
		// const isConfirmed = window.confirm('로그아웃 하시겠습니까?');
		// if (!isConfirmed) return;
		// logout();
	};

	return <span onClick={signoutHandler}>{children}</span>;
};

export default SignOut;
