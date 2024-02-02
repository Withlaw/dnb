import { Session } from '@supabase/supabase-js';

import { supabase } from '@/adapters/api/supabase-client.ts';
import { BookDataFromServer } from '@/features/books/model';
import {
	UserDataFromServer,
	UserDataToServer,
} from '@/features/users/model.ts';

export interface UserServiceInterface {
	getCurrentSession: () => Promise<Session | null>;
	getUser: () => Promise<UserDataFromServer | null>;
	editUser: (id: number, data: UserDataToServer) => Promise<void>;
	getUserBooks: (id?: number) => Promise<BookDataFromServer[] | undefined>;
	getUserRentals: (id?: number) => Promise<BookDataFromServer[] | undefined>;
}

export default class UserService implements UserServiceInterface {
	async getCurrentSession() {
		const {
			data: { session },
			error,
		} = await supabase.auth.getSession();
		// 클라이언트에 저장된 로컬 세션 정보를 가져옴.
		// 액세스토큰이 만료되었으면 자동으로 리프레쉬하여 새 세션을 받아옴.
		// 로그인 정보가 없으면 null을 반환한다.
		// -> 로그인 여부를 확인함

		if (error) throw new Error(error.message);

		return session;
	}

	async getUser() {
		const { data: session } = await supabase.auth.getSession();
		if (!session.session) return null;

		const { data: getUserData, error: getUserError } =
			await supabase.auth.getUser();
		// 현재 세션이 존재할 경우 서버에 요청을 보내 db에서 유저 세부 정보를 fetch해옴.
		// 위 로컬 세션에서 유저 정보를 불러오는 것을 권장, 최신의 유저 데이터가 필요할 경우에만 사용.
		// user 객체가 존재한다는 것은 서버로부터 access token을 검증하여 인증 허가된 권한을 받았다는 것을 의미함.
		// 인자로 jwt 액세스 토큰을 받음. 기본값으로 현재 세션의 토큰을 이용함.

		if (getUserError) throw new Error(getUserError.message);

		const { data: getMemberData, error: getMemberError } =
			await this._getMember(getUserData.user.id);

		if (getMemberError) throw new Error(getMemberError.message);

		const user = new UserDataFromServer({
			email: getUserData.user?.email,
			role: getUserData.user?.role,
			...getMemberData,
		});

		return user;
	}

	async editUser(id: number, data: UserDataToServer) {
		// password는 따로?

		const updateUser = supabase.auth.updateUser({
			data: { full_name: data.full_name },
		});

		const updateMember = supabase
			.from('members')
			.update(data)
			.eq('id', id)
			.select()
			.single();

		const [updateUserResponse, updateMemberResponse] = await Promise.all([
			updateUser,
			updateMember,
		]);

		if (updateUserResponse.error || updateMemberResponse.error) {
			throw new Error('Could not update user.');
		}

		// const user = new UserDataFromServer({
		//   email:updateUserResponse.data.user.email,
		//   role: updateUserResponse.data.user.role,
		//   ...updateMemberResponse.data,
		// });

		// return { user, session: updateUserResponse.data.user };
	}

	async getUserBooks(id?: number) {
		if (!id) return;

		const { data, error } = await supabase
			.from('books')
			.select('*')
			.eq('member', id)
			.order('created_at', { ascending: false });

		if (error) {
			console.error(error);
			throw new Error('User Books could not be loaded');
		}

		const books = data?.map(data => new BookDataFromServer(data));
		return books;
	}

	async getUserRentals(id?: number) {
		if (!id) return;

		const { data, error } = await supabase
			.from('rentals')
			.select(`id, start_at, status, book:book_id(*)`)
			.eq('customer_id', id)
			.order('start_at', { ascending: false });

		if (error) throw new Error(error.message);

		const books = data.map(
			item =>
				new BookDataFromServer({
					...item.book,
					rental_id: item.id,
					rental_info: {
						start_at: item.start_at,
						status: item.status,
					},
				}),
		);

		return books;
	}

	private _getMember(id: string) {
		return supabase
			.from('members')
			.select('id,full_name,address,books_num,grade,avatar_url')
			.eq('user_id', id)
			.single();
	}
}

export class UserServiceTest implements UserServiceInterface {
	constructor(
		private readonly testOptions: {
			isLogin?: boolean;
			rentalId?: number;
			rentalStatus?: '대여 중' | '반납 완료';
		},
	) {}

	async getCurrentSession() {
		const { isLogin } = this.testOptions;
		if (isLogin) return {} as Session;
		else return null;
	}
	async getUser() {
		const { isLogin } = this.testOptions;
		if (isLogin)
			return {
				id: 1,
				email: 'email',
				fullName: 'fullName',
				address: 'address',
				grade: 5,
			} as UserDataFromServer;
		else return null;
	}
	async editUser() {}

	async getUserBooks() {
		const { rentalId, rentalStatus } = this.testOptions;
		return [
			{
				title: 'title',
				author: 'author',
				publisher: 'publisher',
				fee: 1,
				rentalId,
				rentalStatus,
			},
		] as BookDataFromServer[];
	}
	async getUserRentals() {
		return [
			{
				title: 'rental',
				author: 'author',
				publisher: 'publisher',
				fee: 1,
				rentalId: 1,
				rentalStatus: '대여중',
			},
		] as BookDataFromServer[];
	}
}
