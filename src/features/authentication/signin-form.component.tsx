import { FieldValues, useForm } from 'react-hook-form';

import { AuthValidate } from '@/features/authentication/_utils.ts';
import FormRow from '@/features/authentication/sign-form-row.component.tsx';

type Props = {
	children?: React.ReactNode;
	onSubmit: (data: FieldValues) => void;
	isLoading: boolean;
};

type UseFormValues = {
	email: string;
	password: string;
};

const SigninForm = ({ children, onSubmit, isLoading }: Props) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<UseFormValues>();

	const submitHandler = (formData: FieldValues) => {
		onSubmit(formData);
		reset();
	};
	// const submitErrorHandler = (error: FieldErrors<FieldValues>) => {
	// };

	return (
		<form onSubmit={handleSubmit(submitHandler)}>
			<FormRow name="email" message={errors.email?.message}>
				<input
					type="email"
					placeholder="email@example.com"
					{...register('email', {
						validate: value => {
							return AuthValidate(value)
								.isEmpty('이메일 주소를 입력해주세요.')
								.isEmail('유효한 이메일 주소를 입력해주세요.')
								.done();
						},
						disabled: isLoading,
					})}
				/>
			</FormRow>

			<FormRow name="password" message={errors.password?.message}>
				<input
					type="password"
					placeholder="••••••••"
					{...register('password', {
						validate: value => {
							return AuthValidate(value)
								.isEmpty('비밀 번호를 입력해주세요.')
								.done();
						},
						disabled: isLoading,
					})}
				/>
			</FormRow>

			<div>
				<button
					type="submit"
					disabled={isLoading}
					className="my-2 w-full cursor-pointer space-x-2 rounded-md border border-solid border-stone-300 bg-green-700 px-2 py-2 text-center text-sm text-stone-100 outline-none hover:bg-green-600">
					<span className="truncate ">Sign In</span>
				</button>
			</div>

			<div>{children}</div>
		</form>
	);
};

export default SigninForm;
