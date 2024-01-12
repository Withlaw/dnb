import { FieldValues } from 'react-hook-form';

import SignupForm from '@/features/authentication/signup-form.component.tsx';
import useSignup from '@/features/authentication/use-signup.hook.ts';
import { UserDataToServer } from '@/features/authentication/users.model.ts';

const Signup = () => {
	const { signup } = useSignup();

	const signupHandler = (data: FieldValues) => {
		const user = new UserDataToServer(data);
		signup(user);
	};

	// return <SignupForm onSubmit={signinHandler} isLoading={isLoading} />;
	return <SignupForm onSubmit={signupHandler} />;
};

export default Signup;
