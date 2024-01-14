const UserBooks = () => {
	return (
		<li className="relative flex justify-between hover:cursor-pointer ">
			<div className="flex space-x-3">
				<figure>
					<img src="" alt="book_image" className="size-24 bg-slate-400" />
				</figure>

				<div className="flex flex-col justify-between p-1">
					<div className="flex flex-col space-y-1">
						<span className="text-sm font-semibold">
							제목이 딥니이ㅏㅇ나ㅣㅓ라ㅣㄴ얼먕항ㄴ앙녕 항니 1ㅇ니ㅏ러 ㄴ알
						</span>
						<span className="text-xs">저자 | 출판사</span>
					</div>
					<div>
						<span className="text-xs">대여료</span>
					</div>
				</div>
			</div>

			<div className="absolute bottom-0 right-0 flex size-12 flex-none items-center rounded-full bg-red-100 p-2 text-center text-sm group-hover:font-semibold sm:size-10 sm:text-xs">
				<span>대여 가능</span>
			</div>
		</li>
	);
};

export default UserBooks;
