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
    console.log('login data: ',data)
    return data;
  }
  
}

export default new AuthService()