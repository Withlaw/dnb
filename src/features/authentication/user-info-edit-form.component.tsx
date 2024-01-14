import { FieldValues, useForm } from 'react-hook-form';

import FormRow from '@/features/authentication/user-info-edit-form-row.component.tsx';
import { UserDataFromServer } from '@/features/authentication/users.model.ts';
import Button from '@/ui/button.tsx';

type UseFormInput = {
	fullName: string;
	address: string;
	avatarUrl?: FileList | string;
};

type Props = {
	defaultValue: UserDataFromServer;
	onSubmit?: (data: FieldValues) => void;
};

const UserInfoEditForm = ({ defaultValue, onSubmit }: Props) => {
	const { register, handleSubmit } = useForm<UseFormInput>({
		values: {
			fullName: defaultValue.fullName,
			address: defaultValue.address,
			avatarUrl: defaultValue.avatarUrl,
		},
	});

	const submitHandler = (formData: FieldValues) => {
		if (onSubmit)
			onSubmit({
				...defaultValue,
				...formData,
			});
	};

	return (
		<form onSubmit={handleSubmit(submitHandler)}>
			<fieldset className="flex flex-col">
				<FormRow name="email">
					<input
						id="email"
						type="text"
						disabled
						defaultValue={defaultValue.email}
						className="border border-solid text-sm"
					/>
				</FormRow>

				<FormRow name="fullName">
					<input
						type="text"
						id="fullName"
						className="border border-solid text-sm"
						{...register('fullName')}
					/>
					{/* <div>
        <span>확인</span>
      </div> */}
				</FormRow>
				<FormRow name="address">
					<input
						type="text"
						id="address"
						className="border border-solid text-sm"
						{...register('address')}
					/>
				</FormRow>
				{/* <FormRow name="avatar">
					<input
						type="file"
						id="avatar"
						className="border border-solid text-sm"
						{...register('avatarUrl')}
					/>
				</FormRow> */}
			</fieldset>

			{/* <fieldset>
    <label htmlFor="password">비밀번호</label>
    <input id="password"></input>
  </fieldset> */}

			<div className="my-8 flex justify-center">
				<div className="w-40">
					<Button>확인</Button>
				</div>
			</div>
		</form>
	);
};

export default UserInfoEditForm;
