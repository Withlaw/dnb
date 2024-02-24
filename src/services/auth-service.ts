import { Session } from '@supabase/supabase-js';

import { supabase } from '@/adapters/api/supabase-client.ts';
import { SignData } from '@/features/authentication/_lib/model.ts';
import { UserDataFromServer } from '@/features/users/_lib/model.ts';

export interface AuthServiceInterface {
	signup: ({ full_name, email, password }: SignData) => Promise<{
		user: UserDataFromServer;
		session: Session | null;
	}>;
	signin: ({ email, password }: SignData) => Promise<{
		user: UserDataFromServer;
		session: Session;
	}>;
	signout: () => Promise<void>;
	signinWith: (provider: 'github') => Promise<void>;
	postSignupWithOauth: () => Promise<void>;
}

export default class AuthService implements AuthServiceInterface {
	async signup({ full_name, email, password }: SignData) {
		const { data: signupData, error: signupError } = await supabase.auth.signUp(
			{
				email,
				password,
				options: {
					data: {
						full_name,
					},
				},
			},
		);
		// 계정 생성
		// full name과 nick name을 구분해야 할 듯. 유저 이름은 계정 메타 데이터로, 닉네임은 멤버 테이블 요소로 관리할 것.

		if (signupError) throw new Error(signupError.message);

		const { data: createMemberData, error: createMemberError } =
			await this._createMember(full_name!);
		// 계정 생성이 완료되면 멤버 테이블 생성

		if (createMemberError) throw new Error(createMemberError.message);

		const user = new UserDataFromServer({
			email: signupData.user?.email,
			role: signupData.user?.role,
			...createMemberData,
		});

		return { user, session: signupData.session };
	}

	async signin({ email, password }: SignData) {
		const { data: signinData, error: signinError } =
			await supabase.auth.signInWithPassword({
				email,
				password,
			});

		if (signinError) throw new Error(signinError.message);
		// 유효하지 않은 이메일 혹은 패스워드 일 때, 피드백 메시지 반환할 것

		const { data: getMemberData, error: getMemberError } =
			await this._getMember(signinData.user.id);

		if (getMemberError) throw new Error(getMemberError.message);

		const user = new UserDataFromServer({
			email: signinData.user?.email,
			role: signinData.user?.role,
			...getMemberData,
		});

		return { user, session: signinData.session };
	}

	async signinWith(provider: 'github') {
		const { error } = await supabase.auth.signInWithOAuth({
			provider,
		});
		// provider : "github"
		// url : "https://wtydbgnjmnqyvpgcvsju.supabase.co/auth/v1/authorize?provider=github"

		if (error) throw new Error(error.message);

		// const { data: sessionData } = await supabase.auth.getSession();
		// const { data: userData } = await supabase.auth.getUser();

		// console.log('signinWith github: ', userData, sessionData);
		// window.localStorage.setItem('github: ', JSON.stringify(userData));
		// window.localStorage.setItem(
		// 	'github session: ',
		// 	JSON.stringify(sessionData),
		// );

		// return userData;
		const { error: createMemberError } = await this._createMember(
			Date.now() + '',
		);
		// 계정 생성이 완료되면 멤버 테이블 생성

		if (createMemberError) throw new Error(createMemberError.message);
	}

	async postSignupWithOauth() {
		return;
		/*
		const { data } = await supabase.auth.getSession();
		if (!data.session) return;

		const { data: meberData } = await this._getMember(data.session.user.id);
		if (meberData) return;
		// member 데이터가 존재하면 return

		const { error: createMemberError } = await this._createMember(
			Date.now() + '',
		);
		// const { error: createMemberError } = await this._createMember(
		// 	data.session.user.email?.split('@')[0] ?? Date.now() + '',
		// );

		if (createMemberError) throw new Error(createMemberError.message);
    */
	}

	async signout() {
		const { error } = await supabase.auth.signOut();

		if (error) throw new Error(error.message);
	}

	private _getMember(id: string) {
		return supabase
			.from('members')
			.select('id,full_name,address,books_num,grade,avatar_url')
			.eq('user_id', id)
			.single();
	}

	private _createMember(full_name: string) {
		return supabase
			.from('members')
			.insert([
				{ full_name, address: '', books_num: 0, grade: 0, avatar_url: '' },
			])
			.select('id,full_name,address,books_num,grade,avatar_url')
			.single();
	}
}
