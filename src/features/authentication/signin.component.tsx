import { FieldValues } from 'react-hook-form';

import SigninForm from '@/features/authentication/signin-form.component.tsx';
import useLogin from '@/features/authentication/use-login.hook.ts';
import { SignData } from '@/features/authentication/users.model.ts';

const Signin = () => {
	const { login, isLoading } = useLogin();

	const signinHandler = (data: FieldValues) => {
		const user = new SignData(data);
		login(user);
	};

	return <SigninForm onSubmit={signinHandler} isLoading={isLoading} />;
};

export default Signin;
