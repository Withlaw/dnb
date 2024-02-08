import { FieldValues } from 'react-hook-form';

import { SignData } from '@/features/authentication/_model.ts';
import SignupForm from '@/features/authentication/signup-form.component.tsx';
import useSignup from '@/features/authentication/use-signup.hook.ts';

const Signup = () => {
	const { signup } = useSignup();

	const signupHandler = (data: FieldValues) => {
		const user = new SignData(data);
		signup(user);
	};

	// return <SignupForm onSubmit={signinHandler} isLoading={isLoading} />;
	return <SignupForm onSubmit={signupHandler} />;
};

export default Signup;
