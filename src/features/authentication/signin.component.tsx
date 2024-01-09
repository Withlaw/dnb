import { FieldValues } from 'react-hook-form';

import SigninForm from '@/features/authentication/signin-form.component.tsx';

const Signin = () => {
	const signinHandler = (data: FieldValues) => {};

	return <SigninForm onSubmit={signinHandler} />;
};

export default Signin;
