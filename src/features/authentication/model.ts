type Values = {
  [k:string]: any;
}

export class SignData {
  readonly email:string;
  readonly password:string;
  readonly full_name?:string;

  constructor(data:Values){
    this.email = data.email;
    this.password = data.password;
    this.full_name = data.fullName;
  }
}