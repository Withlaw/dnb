import useUser from '@/features/authentication/use-user.hook.ts';
import UserInfo from '@/features/authentication/user-info.componen.tsx';

const UserDetail = () => {
	const { user } = useUser();

	return (
		user && (
			<div className="flex flex-col">
				<UserInfo user={user} />

				<div className="flex flex-col space-y-2">
					<div className="flex justify-between rounded-md border border-solid border-stone-300 p-3">
						<div className=" flex divide-x divide-stone-400">
							<span className="px-2 hover:cursor-pointer hover:text-stone-700">
								등록한 책
							</span>
							<span className="px-2 hover:cursor-pointer hover:text-stone-700">
								찜한 책
							</span>
						</div>
					</div>

					<div className="flex flex-auto flex-col space-y-2 rounded-md border border-solid border-stone-300 p-3">
						<div className="flex w-full justify-end ">
							<span>옵션</span>
						</div>
						<ul className="flex flex-col space-y-2">
							<li className="relative flex justify-between hover:cursor-pointer ">
								<div className="flex space-x-3">
									<figure>
										<img
											src=""
											alt="book_image"
											className="size-24 bg-slate-400"
										/>
									</figure>

									<div className="flex flex-col justify-between p-1">
										<div className="flex flex-col space-y-1">
											<span className="text-sm font-semibold">
												제목이 딥니이ㅏㅇ나ㅣㅓ라ㅣㄴ얼먕항ㄴ앙녕 항니 1ㅇ니ㅏ러
												ㄴ알
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

							<li>이ㅏㄴ러미ㅏㅇ너라ㅣㅁ넝라ㅣ먼어리ㅗ마넝로ㅓㅏㅁ농라ㅓ모</li>
							<li>이ㅏㄴ러미리ㅗ마넝로ㅓㅏㅁ농라ㅓ모</li>
							<li>이ㅏㄴ러미ㅏ어리ㅗ마넝로ㅓㅏㅁ농라ㅓ모</li>
							<li>이ㅏㄴ러미ㅏㅇ너라ㅣㅁ넝라ㅣ먼어리ㅗ마넝로ㅓㅏㅁ농라ㅓ모</li>
							<li>이ㅏㄴ러미ㅏㅇ너라ㅣㅁ넝라ㅣ먼ㅓㅏㅁ농라ㅓ모</li>
							<li>이ㅏㄴ러미ㅏㅇ너라ㅣㅁ넝라ㅣ먼어리ㅗ마넝로ㅓㅏㅁ농라ㅓ모</li>
							<li>이ㅏㄴ러미ㅏㅇ너라마넝로ㅓㅏㅁ농라ㅓ모</li>
							<li>이ㅏㄴ러미ㅏㅇ너라ㅣㅁ넝라ㅣ먼어리ㅗ마넝로ㅓㅏㅁ농라ㅓ모</li>
							<li>이ㅏㄴ러미ㅏㅇ너라ㅣㅁ넝라ㅣ먼어리ㅗ마넝로ㅓㅏㅁ농라ㅓ모</li>
							<li>이ㅏㄴ러미ㅏㅇ너라ㅣㅁ넝라ㅣ먼어리ㅗ마넝로ㅓㅏㅁ농라ㅓ모</li>
							<li>이ㅏㄴ러미ㅏㅇ너라ㅣㅁ넝라ㅣ먼어리ㅗ마넝로ㅓㅏㅁ농라ㅓ모</li>
							<li>이ㅏㄴ러미ㅏㅇ너라ㅣㅁ넝라ㅣ먼어리ㅗ마넝로ㅓㅏㅁ농라ㅓ모</li>
							<li>이ㅏㄴ러미ㅏㅇ너라ㅣㅁ넝라ㅣ먼어리ㅗ마넝로ㅓㅏㅁ농라ㅓ모</li>
							<li>이ㅏㄴ러미ㅏㅇ너라ㅣㅁ넝라ㅣ먼어리ㅗ마넝로ㅓㅏㅁ농라ㅓ모</li>
							<li>이ㅏㄴ러미ㅏㅇ너라ㅣㅁ넝라ㅣ먼어리ㅗ마넝로ㅓㅏㅁ농라ㅓ모</li>
							<li>이ㅏㄴ러미ㅏㅇ너라ㅣㅁ넝라ㅣ먼어리ㅗ마넝로ㅓㅏㅁ농라ㅓ모</li>
							<li>이ㅏㄴ러미ㅏㅇ너라ㅣㅁ넝라ㅣ먼어리ㅗ마넝로ㅓㅏㅁ농라ㅓ모</li>
							<li>이ㅏㄴ러미ㅏㅇ너라ㅣㅁ넝라ㅣ먼어리ㅗ마넝로ㅓㅏㅁ농라ㅓ모</li>
							<li>이ㅏㄴ러미ㅏㅇ너라ㅣㅁ넝라ㅣ먼어리ㅗ마넝로ㅓㅏㅁ농라ㅓ모</li>
							<li>이ㅏㄴ러미ㅏㅇ너라ㅣㅁ넝라ㅣ먼어리ㅗ마넝로ㅓㅏㅁ농라ㅓ모</li>
							<li>이ㅏㄴ러미ㅏㅇ너라ㅣㅁ넝라ㅣ먼어리ㅗ마넝로ㅓㅏㅁ농라ㅓ모</li>
							<li>이ㅏㄴ러미ㅏㅇ너라ㅣㅁ넝라ㅣ먼어리ㅗ마넝로ㅓㅏㅁ농라ㅓ모</li>
							<li>이ㅏㄴ러미ㅏㅇ너라ㅣㅁ넝라ㅣ먼어리ㅗ마넝로ㅓㅏㅁ농라ㅓ모</li>
							<li>이ㅏㄴ러미ㅏㅇ너라ㅣㅁ넝라ㅣ먼어리ㅗ마넝로ㅓㅏㅁ농라ㅓ모</li>
						</ul>
					</div>
				</div>
			</div>
		)
	);
};

export default UserDetail;
