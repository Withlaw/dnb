export const AuthValidate = (value:string, message?:string) => {
  let errorMessage = message;
  return {
    isEmpty: (message:string) => {
      // ~를 입력해주세요.
      if(errorMessage) return AuthValidate(value, errorMessage);
      if(value.trim() === '') errorMessage = message;
      return AuthValidate(value, errorMessage);
    },
    isEmail : (message:string) => {
      // 유효한 이메일 주소를 입력해주세요.
      if(errorMessage) return AuthValidate(value, errorMessage);
      if(!value.includes('@')) errorMessage = message;
      return AuthValidate(value, errorMessage);
    },
    isLongerThan: (length:number, message:string) => {
      // ~자 이상으로 입력해주세요.
      if(errorMessage) return AuthValidate(value, errorMessage);
      if(value.length < length) errorMessage = message;
      return AuthValidate(value, errorMessage);
    },
    isShorterThan: (length:number, message:string) => {
      // ~자 이하로 입력해주세요.
      if(errorMessage) return AuthValidate(value,errorMessage);
      if(value.length > length) errorMessage = message;
      return AuthValidate(value, errorMessage);
    },
    done: () => {
      if(!errorMessage) return true;
      else return errorMessage;
    }
  }
}

