const UserInfoEdit = () => {
	// useUser
	// form
	// useUserEdit

	return (
		<form className="flex flex-col bg-[#fff] p-3">
			<fieldset>
				<label htmlFor="fullName" className="capitalize">
					이메일
				</label>
				<input id="fullName" disabled></input>
			</fieldset>

			<fieldset>
				<label htmlFor="fullName" className="capitalize">
					닉네임
				</label>
				<input id="fullName"></input>
			</fieldset>

			<fieldset>
				<label htmlFor="password">비밀번호</label>
				<input id="password"></input>
			</fieldset>

			<fieldset>
				<label htmlFor="address">주소</label>
				<input id="address"></input>
			</fieldset>

			<fieldset>
				<label htmlFor="avatar">아바타</label>
				<input id="avatar"></input>
			</fieldset>

			<div>
				<button>저장하기</button>
			</div>
		</form>
	);
};

export default UserInfoEdit;
