type FormFieldValues = {
  [k:string]: any;
}

export class UserDataFromServer {
  readonly id:string;
  readonly email:string;
  readonly fullName:string;
  readonly role:string;
  readonly avatarUrl:string;

  constructor(data:FormFieldValues){
    this.id = data.id;
    this.email = data.email;
    this.fullName = data.full_name;
    this.role = data.role;
    this.avatarUrl = data.avatar_url
  }
}

export class UserDataToServer {
  readonly email:string;
  readonly password:string;
  readonly full_name?:string;

  constructor(data:FormFieldValues){
    this.email = data.email;
    this.password = data.password;
    this.full_name = data.fullName;
  }
}