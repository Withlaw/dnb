import FormRow from '@/features/authentication/auth-form-row.component.tsx';

const SignupForm = () => {
	return (
		<form>
			<FormRow name="email">
				<input type="email" placeholder="email@example.com" />
			</FormRow>

			<FormRow name="password">
				<input type="password" placeholder="••••••••" />
			</FormRow>

			<div>
				<button className="my-2 w-full cursor-pointer space-x-2 rounded-md border border-solid border-stone-300 bg-green-700 px-2 py-2 text-center text-sm text-stone-100 outline-none hover:bg-green-600">
					<span className="truncate ">Sign Up</span>
				</button>
			</div>
		</form>
	);
};

export default SignupForm;
