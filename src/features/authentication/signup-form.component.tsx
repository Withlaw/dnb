import { FieldValues, useForm } from 'react-hook-form';

import FormRow from '@/features/authentication/sign-form-row.component.tsx';
import { AuthValidate } from '@/features/authentication/utils.ts';

type Props = {
	children?: React.ReactNode;
	onSubmit: (data: FieldValues) => void;
	isLoading?: boolean;
};

type UseFormValues = {
	fullName: string;
	email: string;
	password: string;
	passwordCheck: string;
};

const SignupForm = ({ onSubmit, isLoading }: Props) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		reset,
	} = useForm<UseFormValues>();

	const passwordValue = watch('password');
	// const passwordValue = getValues('password');
	const isPasswordTyped = passwordValue && passwordValue.trim() !== '';

	// console.log('errors', errors.password);

	const submitHandler = (formData: FieldValues) => {
		onSubmit(formData);
		reset();
	};
	// const submitErrorHandler = (error: FieldErrors<FieldValues>) => {
	// };
	return (
		<form onSubmit={handleSubmit(submitHandler)}>
			<FormRow name="full name" message={errors.fullName?.message}>
				<input
					type="text"
					placeholder="full name"
					{...register('fullName', {
						validate: value => {
							return AuthValidate(value)
								.isEmpty('사용하실 닉네임을 입력해주세요.')
								.done();
						},
						disabled: isLoading,
					})}
				/>
			</FormRow>

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

			<FormRow
				name="password"
				message={errors.password?.message ?? errors.passwordCheck?.message}>
				<input
					type="password"
					placeholder="••••••••"
					{...register('password', {
						validate: value => {
							return AuthValidate(value)
								.isEmpty('비밀 번호를 입력해주세요.')
								.isLongerThan(8, '8자리 이상 입력해주세요.')
								.done();
						},
						disabled: isLoading,
					})}
				/>
				{isPasswordTyped &&
					typeof AuthValidate(passwordValue)
						.isEmpty('.')
						.isLongerThan(8, '.')
						.done() !== 'string' && (
						// {isPasswordTyped && !errors.password && (
						<input
							type="password"
							placeholder="••••••••"
							{...register('passwordCheck', {
								validate: value => {
									return AuthValidate(value)
										.isMatch(passwordValue, '비밀 번호가 일치하지 않습니다.')
										.done();
								},
								disabled: isLoading,
							})}
						/>
					)}
			</FormRow>

			<div>
				<button
					disabled={isLoading}
					className="my-2 w-full cursor-pointer space-x-2 rounded-md border border-solid border-stone-300 bg-green-700 px-2 py-2 text-center text-sm text-stone-100 outline-none hover:bg-green-600">
					<span className="truncate ">Sign Up</span>
				</button>
			</div>
		</form>
	);
};

export default SignupForm;
