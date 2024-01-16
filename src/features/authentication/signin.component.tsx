import { FieldValues } from 'react-hook-form';

import { SignData } from '@/features/authentication/auth.model.ts';
import SigninForm from '@/features/authentication/signin-form.component.tsx';
import useLogin from '@/features/authentication/use-login.hook.ts';

const Signin = () => {
	const { login, isLoading } = useLogin();

	const signinHandler = (data: FieldValues) => {
		const user = new SignData(data);
		login(user);
	};

	return <SigninForm onSubmit={signinHandler} isLoading={isLoading} />;
};

export default Signin;
