// AuthServiceInterface
// signin(email, password):Promise<undefined>
// signup(email, password):Promise<undefined>
// logout():undefined
//

import { supabase } from "@/adapters/api/supabase-client.ts";

class AuthService {
  
  async signin({email, password}:{email:string, password:string}){
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if(error) throw new Error(error.message)
    // 유효하지 않은 이메일 혹은 패스워드 일 때, 피드백 메시지 반환할 것

    //token storage
    //redirect
    // console.log('login data: ',data)
    return data;
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
    const { data:{ user } , error } = await supabase.auth.getUser()
    // 세션이 있을 경우 db에서 유저 세부 정보를 fetch해옴.
    // 위 로컬 세션에서 유저 정보를 불러오는 것을 권장, 최신의 유저 데이터가 필요할 경우에만 사용.
    // user 객체가 존재한다는 것은 서버로부터 access token을 검증하여 인증 허가된 권한을 받았다는 것을 의미함.
    // 인자로 jwt 액세스 토큰을 받음. 기본값으로 현재 세션의 토큰을 이용함.

    if (error) throw new Error(error.message);

    return user;
  }

}

export default new AuthService()