import { FieldValues } from 'react-hook-form';

import SigninForm from '@/features/authentication/_components/signin-form.component.tsx';
import { SignData } from '@/features/authentication/_lib/model.ts';
import useLogin from '@/features/authentication/login/use-login.hook.ts';

const Signin = () => {
	const { login, isLoading } = useLogin();

	const signinHandler = (data: FieldValues) => {
		const user = new SignData(data);
		login(user);
	};

	return <SigninForm onSubmit={signinHandler} isLoading={isLoading} />;
};

export default Signin;
