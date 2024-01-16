type Values = {
  [k:string]: any;
}

// export class MemberDataFromServer {
//   readonly id:string;
//   readonly id:string;
//   readonly id:string;
//   readonly id:string;
//   readonly id:string;
//   readonly id:string;

// }

export class UserDataFromServer {
  readonly id:number;
  readonly email:string;
  readonly fullName:string;
  readonly role:string;
  readonly avatarUrl:string;
  readonly grade:number;
  readonly booksNum:number;
  readonly address:string;


  constructor(data:Values){
    this.id = data.id;
    this.email = data.email;
    this.fullName = data.full_name;
    this.role = data.role;
    this.avatarUrl = data.avatar_url;
    this.grade = data.grade;
    this.booksNum = data.books_num;
    this.address = data.address;
  }
}

export class UserDataToServer {
  readonly full_name?:string;
  readonly avatar_url?:string;
  readonly address?:string;
  readonly grade?:number;
  readonly books_num?:number;

  constructor(data:Values){
    this.full_name = data.fullName;
    this.avatar_url = data.avatarUrl;
    this.address = data.address;
    this.grade = data.grade;
    this.books_num = data.booksNum;
  }
}