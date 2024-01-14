type Values = {
  [k:string]: any;
}

export class RentalInfoFromServer {
  readonly id:number
  readonly startAt:Date;
  readonly endAt:Date;
  readonly numDays:number;
  readonly fee:number;
  readonly status:'대여중'|'반납 완료';
  readonly book:number;
  readonly customerId:number
  readonly merchantId:number

  constructor(data:Values) {
    this.id = data.id;
    this.startAt = data.start_at;
    this.endAt = data.end_at; 
    this.numDays = data.num_days;
    this.fee = data.fee;
    this.status = data.status;
    this.book = data.book_id;
    this.customerId = data.customer_id;
    this.merchantId = data.merchant_id;
  }
}

export class RentalInfoToServer {
  readonly end_at?:string;
  readonly num_days:number;
  readonly fee:number;
  readonly book_id:number;
  readonly customer_id:number
  readonly merchant_id:number
  // readonly status?:'대여중'|'반납 완료';

  constructor(data:Values) {
    this.end_at = data.endAt; 
    this.num_days = data.numDays;
    this.fee = data.fee;
    this.book_id = data.bookId;
    this.customer_id = data.customerId;
    this.merchant_id = data.merchantId;
    // this.status = data.status;
  }
}