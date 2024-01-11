import { FieldValues } from 'react-hook-form';

import SignupForm from '@/features/authentication/signup-form.component.tsx';
import useSignup from '@/features/authentication/use-signup.hook.ts';

const Signup = () => {
	const { signup } = useSignup();

	const signupHandler = (data: FieldValues) => {
		signup({
			fullName: data.fullName,
			email: data.email,
			password: data.password,
		});
		console.log('signupHandler: ', data);
	};

	// return <SignupForm onSubmit={signinHandler} isLoading={isLoading} />;
	return <SignupForm onSubmit={signupHandler} />;
};

export default Signup;
