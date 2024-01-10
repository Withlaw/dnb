import { FieldValues } from 'react-hook-form';

import SigninForm from '@/features/authentication/signin-form.component.tsx';
import useLogin from '@/features/authentication/use-login.hook.ts';

const Signin = () => {
	const { login, isLoading } = useLogin();
	const signinHandler = (data: FieldValues) => {
		console.log('submit data: ', data);
		login({
			email: data.email,
			password: data.password,
		});
	};

	return <SigninForm onSubmit={signinHandler} isLoading={isLoading} />;
};

export default Signin;
