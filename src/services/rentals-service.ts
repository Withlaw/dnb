

import { supabase } from '@/adapters/api/supabase-client.ts';
import { API_SUPABASE  } from '@/constants/index.ts';
import { RentalInfoFromServer, RentalInfoToServer } from '@/features/rentals/rentals.model.ts';

class RentalsService {
  readonly endpoint = 'rentals';

  constructor(private readonly baseURL : string, private readonly apiKey : string){}

  async getRentalInfo (rentalId:number) {
    const { data , error } = await supabase.from(this.endpoint).select('*').eq('id', rentalId).single();

    if(error) throw new Error(error.message);

    const rentalInfo = new RentalInfoFromServer(data)
    return rentalInfo;
  }

  async rent (rentalInfo:RentalInfoToServer) {
    // 책 대여하기 
    // 주민이 대여 요청 -> rental table에 새 데이터 생성.  (이 데이터엔 해당되는 주민과 상인만 접근 가능)
    // 상인이 요청 승낙 -> 상인 user_id로 책의 rental_id 수정.
    // 상인이 반납 처리 -> 책, 렌탈 데이터 수정.
		/*
    {
      end_at:'',
      num_days:1,
      fee:1,
      book:1,
      customer:1,
      merchant:1,
      status:'fsd',
    }
    */
  //  console.log('rentalInfo: ',rentalInfo)

    const { data:rentData , error:rentError } = await supabase.from(this.endpoint).insert([rentalInfo]).select().single();


    if(rentError) throw new Error(rentError.message);

    const { error:updataBookStateError } = await supabase.from('books').update({ status: '대여 불가', rental_id: rentData.id, }).eq('id', rentalInfo.book_id).select()

    if(updataBookStateError) throw new Error(updataBookStateError.message);


    const rentalResult = new RentalInfoFromServer(rentData);
    return rentalResult;
  }

  async return (rentalId:number) {
    const { data:returnData ,error:returnError } = await supabase.from(this.endpoint).update({ status: '반납 완료' }).eq('id', rentalId).select().single()

    if(returnError) throw new Error(returnError.message);

    const { error:updataBookStateError } = await supabase.from('books').update({ status: '대여 가능', rental_id: null }).eq('id', returnData.book_id!).select()

    if(updataBookStateError) throw new Error(updataBookStateError.message);

    const returnResult = new RentalInfoFromServer(returnData);
    return returnResult;

  }
}

export const rentalsService = new RentalsService(API_SUPABASE.BASE_URL, API_SUPABASE.KEY);
