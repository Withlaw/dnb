import icons from '@/assets/icons.svg';
import SignOut from '@/features/authentication/signout.component.tsx';
import useUser from '@/features/authentication/use-user.hook.ts';

enum Style {
	ITEMS = 'flex items-center items-center space-x-2 text-xs ',
	ITEM_NAME = 'w-10',
	ITEM = 'text-stone-800',
}

const UserInfo = () => {
	// const { user } = useUser();

	// console.log('user', user);

	return (
		<div className="my-2 flex flex-none items-center space-x-3 rounded-md border border-solid border-stone-300 px-5 py-3">
			<figure className="flex-none">
				{/* <img src="" alt="avatar" className="size-28 rounded-full bg-red-100" /> */}
				<svg className="size-20 rounded-full">
					<use href={`${icons}#default-avatar`}></use>
				</svg>
			</figure>

			<div className="flex flex-auto flex-col space-y-1 p-2 text-sm">
				<div className={Style.ITEMS}>
					<span className={Style.ITEM_NAME}>닉네임</span>
					<span className={Style.ITEM}>등록하기</span>
				</div>
				<div className={Style.ITEMS}>
					<span className={Style.ITEM_NAME}>이메일</span>
					<span className={Style.ITEM}>등록하기</span>
				</div>
				<div className={Style.ITEMS}>
					<span className={Style.ITEM_NAME}>주소</span>
					<span className={Style.ITEM}>등록하기</span>
				</div>
				<div className={Style.ITEMS}>
					<span className={Style.ITEM_NAME}>평점</span>
					<span className={Style.ITEM}>별별별별별</span>
				</div>

				<div>
					<span>수정하기</span>
					<SignOut />
				</div>
			</div>
		</div>
	);
};

export default UserInfo;