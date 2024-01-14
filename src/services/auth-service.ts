// AuthServiceInterface
// signin(email, password):Promise<undefined>
// signup(email, password):Promise<undefined>
// logout():undefined
//

import { supabase } from "@/adapters/api/supabase-client.ts";
import { SignData, UserDataFromServer, UserDataToServer } from "@/features/authentication/users.model.ts";
import { BookDataFromServer } from "@/features/books/books.model.ts";

class AuthService {
  
  async signup({ full_name, email, password }: SignData){
  
    /*
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name,
          avatar_url: '',
        }
      }
    })


    if(error) throw new Error(error.message)

    const user = new UserDataFromServer({
      id:data.user?.id,
      email:data.user?.email,
      role: data.user?.role,
      ...data.user?.user_metadata,
    });

    return { user, session: data.session };
*/

    const { data: signupData, error:signupError } = await supabase.auth.signUp({
      email,
      password, 
      options: {
        data: {
          full_name,
        }
      }
    });
    // 계정 생성
    // full name과 nick name을 구분해야 할 듯. 유저 이름은 계정 메타 데이터로, 닉네임은 멤버 테이블 요소로 관리할 것.

    if (signupError) throw new Error (signupError.message);

    const { data: createMemberData , error:createMemberError } = await this._createMember(full_name!);
    // 계정 생성이 완료되면 멤버 테이블 생성

    if (createMemberError) throw new Error (createMemberError.message);

    const user = new UserDataFromServer({
      email:signupData.user?.email,
      role: signupData.user?.role,
      ...createMemberData,
    });
    
    return { user, session: signupData.session };
  }

  async signin({ email, password }:SignData){
    const { data: signinData, error:signinError } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if(signinError) throw new Error(signinError.message)
    // 유효하지 않은 이메일 혹은 패스워드 일 때, 피드백 메시지 반환할 것

    const { data: getMemberData, error:getMemberError } = await this._getMember(signinData.user.id);

    if(getMemberError) throw new Error(getMemberError.message)

    const user = new UserDataFromServer({
      email:signinData.user?.email,
      role: signinData.user?.role,
      ...getMemberData,
    });

    return { user, session: signinData.session };
  }

  async signout() {
    const { error } = await supabase.auth.signOut();

    if (error) throw new Error(error.message);
  }

  async getCurrentSession() {
    const { data : { session }, error } = await supabase.auth.getSession();
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

    const { data:getUserData , error:getUserError } = await supabase.auth.getUser()
    // 현재 세션이 존재할 경우 서버에 요청을 보내 db에서 유저 세부 정보를 fetch해옴.
    // 위 로컬 세션에서 유저 정보를 불러오는 것을 권장, 최신의 유저 데이터가 필요할 경우에만 사용.
    // user 객체가 존재한다는 것은 서버로부터 access token을 검증하여 인증 허가된 권한을 받았다는 것을 의미함.
    // 인자로 jwt 액세스 토큰을 받음. 기본값으로 현재 세션의 토큰을 이용함.

    if (getUserError) throw new Error(getUserError.message);

    const { data: getMemberData, error:getMemberError } = await this._getMember(getUserData.user.id);

    if(getMemberError) throw new Error(getMemberError.message)

    const user = new UserDataFromServer({
      email:getUserData.user?.email,
      role: getUserData.user?.role,
      ...getMemberData,
    });

    return user;
  }

  async editUser (id:number, data:UserDataToServer) {
    // password는 따로?
    
    const updateUser=  supabase.auth.updateUser({data:{full_name:data.full_name}})

    const updateMember = supabase.from('members').update(data).eq('id', id).select().single();

    const [updateUserResponse, updateMemberResponse] = await Promise.all([updateUser, updateMember]);

    if(updateUserResponse.error || updateMemberResponse.error) {
      throw new Error('Could not update user.');
    }

    // const user = new UserDataFromServer({
    //   email:updateUserResponse.data.user.email,
    //   role: updateUserResponse.data.user.role,
    //   ...updateMemberResponse.data,
    // });
    
    // return { user, session: updateUserResponse.data.user };
  }

  async getUserBooks (id?:number) {
    if(!id) return;

    const { data, error } = await supabase.from('books').select('*').eq('member', id).order('created_at', { ascending: false });

			if (error) {
				console.error(error);
				throw new Error('User Books could not be loaded');
			}

      const books = data?.map(data => new BookDataFromServer(data));
			return books;
	}

  async getUserRentals (id?:number) {
    if(!id) return;

    const { data, error } = await supabase.from('rentals').select(`start_at, rental_status:status ,book:book_id(*)`).eq('customer_id', id).order('start_at', { ascending: false });

    if(error) throw new Error(error.message);

    const books = data.map(item=>new BookDataFromServer({...item.book, rental_status: item.rental_status}))
    
    console.log('getUserRentals', data, books)
    return books;
  }


  private _createMember (full_name:string) {
    return supabase.from('members').insert([{ full_name, address: '', books_num:0, grade:0, avatar_url:'' },]).select('id,full_name,address,books_num,grade,avatar_url').single();
  } 
  private _getMember (id:string) {
    return supabase.from('members').select('id,full_name,address,books_num,grade,avatar_url').eq('user_id', id).single();
  }
}

export default new AuthService()