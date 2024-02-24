import { FieldValues } from 'react-hook-form';

import SignupForm from '@/features/authentication/_components/signup-form.component.tsx';
import { SignData } from '@/features/authentication/_lib/model.ts';
import useSignup from '@/features/authentication/signup/use-signup.hook.ts';

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
