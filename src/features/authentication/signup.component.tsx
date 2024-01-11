import { FieldValues } from 'react-hook-form';

import SignupForm from '@/features/authentication/signup-form.component.tsx';

const Signup = () => {
	const signupHandler = (data: FieldValues) => {
		console.log('signupHandler: ', data);
	};

	// return <SignupForm onSubmit={signinHandler} isLoading={isLoading} />;
	return <SignupForm onSubmit={signupHandler} />;
};

export default Signup;
