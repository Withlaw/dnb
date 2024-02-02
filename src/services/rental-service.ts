import { supabase } from '@/adapters/api/supabase-client.ts';
import {
	RentalInfoFromServer,
	RentalInfoToServer,
} from '@/features/rentals/model.ts';

export interface RentalServiceInterface {
	getRentalInfo: (id: number) => Promise<RentalInfoFromServer>;
	rent: (data: RentalInfoToServer) => Promise<RentalInfoFromServer>;
	return: (id: number) => Promise<RentalInfoFromServer>;
}

export default class RentalService implements RentalServiceInterface {
	readonly endpoint = 'rentals';

	// constructor(private readonly baseURL : string, private readonly apiKey : string){}

	async getRentalInfo(rentalId: number) {
		const { data, error } = await supabase
			.from(this.endpoint)
			.select('*')
			.eq('id', rentalId)
			.single();

		if (error) throw new Error(error.message);

		const rentalInfo = new RentalInfoFromServer(data);
		return rentalInfo;
	}

	async rent(rentalInfo: RentalInfoToServer) {
		// 책 대여하기 본래래 구현 사항.
		// 주민이 대여 요청 -> 주민 user_id로 rental table에 새 데이터 생성.  (이 데이터엔 해당되는 주민과 상인만 접근 가능)
		// 상인이 요청 승낙 -> 상인 user_id로 책의 rental_id 수정.
		// 상인이 반납 처리 -> 상인 user_id로 책, 렌탈 데이터 수정.
		// => 개발 시간이 부족해서 주민,상인 구별 없이 책과 렌탈 데이터를 수정할 수 있도록 권한 부여해줌.
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

		// 1. 렌탈 테이블에 새 행 생성
		const { data: rentData, error: rentError } = await supabase
			.from(this.endpoint)
			.insert([rentalInfo])
			.select()
			.single();

		if (rentError) throw new Error(rentError.message);

		// 2. 새 렌탈 데이터가 생성되면, 관련된 책의 rental_id 열에 렌탈 f-key 추가.
		const { error: updataBookStateError } = await supabase
			.from('books')
			.update({ status: '대여 불가', rental_id: rentData.id })
			.eq('id', rentalInfo.book_id)
			.select();

		if (updataBookStateError) throw new Error(updataBookStateError.message);

		const rentalResult = new RentalInfoFromServer(rentData);
		return rentalResult;
	}

	async return(rentalId: number) {
		// 1. 렌탈 테이블에서 해당 렌탈의 상태 칼럼 수정.
		// *db 정책에서 customer id 확인 작업 추가할 것
		const { data: returnData, error: returnError } = await supabase
			.from(this.endpoint)
			.update({ status: '반납 완료' })
			.eq('id', rentalId)
			.select()
			.single();

		if (returnError) throw new Error(returnError.message);

		// 2. 수정된 렌탈 데이터에서 책 f-key로 책 테이블에 접근하여 상태 및 rental_id 칼럼 수정.
		const { error: updataBookStateError } = await supabase
			.from('books')
			.update({ status: '대여 가능', rental_id: null })
			.eq('id', returnData.book_id!)
			.select();

		if (updataBookStateError) throw new Error(updataBookStateError.message);

		const returnResult = new RentalInfoFromServer(returnData);
		return returnResult;
	}
}
