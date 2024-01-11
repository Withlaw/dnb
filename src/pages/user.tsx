import { HiMenu } from 'react-icons/hi';
import { ScrollRestoration, useNavigate } from 'react-router-dom';

import HeaderMain from '@/ui/header-main.tsx';
import NavHeader from '@/ui/nav-header.tsx';

const UserPage = () => {
	const navigate = useNavigate();
	const goBack = () => {
		navigate(-1);
	};

	// layout-books-post와 거의 동일함. 나중에 추상화할것.
	return (
		<div className="container mx-auto flex h-dvh max-w-screen-sm flex-col shadow-xl md:w-96 ">
			<HeaderMain>
				<div className="flex min-w-4" onClick={goBack}>
					<NavHeader />
				</div>
				<div>
					<span className="text-2xl hover:cursor-pointer">
						<HiMenu size="24" />
					</span>
				</div>
			</HeaderMain>

			{/* <aside className="bg-green-800">app aside</aside> */}
			<main className="flex-auto bg-stone-50 px-4 pt-[58px]">
				<div className="flex flex-col">
					<div className="my-2 flex flex-none space-x-2 rounded-md border border-solid border-stone-300 p-3">
						<figure className="flex-none">
							<img
								src=""
								alt="avatar"
								className="size-28 rounded-full bg-red-100"
							/>
						</figure>
						<div className="flex flex-col p-2 text-sm">
							<span>이메일</span>
							<span>위치</span>
							<span></span>
							<span>평점</span>
							<span>수정하기</span>
							<span>로그아웃</span>
						</div>
					</div>

					<div className="flex flex-auto flex-col">
						<div className="flex justify-between rounded-md border border-solid border-stone-300 p-3">
							<div>
								<button>등록한 책</button>
								<button>찜한 책</button>
							</div>
							<div>
								<span>옵션</span>
							</div>
						</div>
						<div>
							<ul>
								탭 목록
								<li>
									이ㅏㄴ러미ㅏㅇ너라ㅣㅁ넝라ㅣ먼어리ㅗ마넝로ㅓㅏㅁ농라ㅓ모
								</li>
								<li>
									이ㅏㄴ러미ㅏㅇ너라ㅣㅁ넝라ㅣ먼어리ㅗ마넝로ㅓㅏㅁ농라ㅓ모
								</li>
								<li>
									이ㅏㄴ러미ㅏㅇ너라ㅣㅁ넝라ㅣ먼어리ㅗ마넝로ㅓㅏㅁ농라ㅓ모
								</li>
								<li>
									이ㅏㄴ러미ㅏㅇ너라ㅣㅁ넝라ㅣ먼어리ㅗ마넝로ㅓㅏㅁ농라ㅓ모
								</li>
								<li>
									이ㅏㄴ러미ㅏㅇ너라ㅣㅁ넝라ㅣ먼어리ㅗ마넝로ㅓㅏㅁ농라ㅓ모
								</li>
								<li>
									이ㅏㄴ러미ㅏㅇ너라ㅣㅁ넝라ㅣ먼어리ㅗ마넝로ㅓㅏㅁ농라ㅓ모
								</li>
								<li>
									이ㅏㄴ러미ㅏㅇ너라ㅣㅁ넝라ㅣ먼어리ㅗ마넝로ㅓㅏㅁ농라ㅓ모
								</li>
								<li>
									이ㅏㄴ러미ㅏㅇ너라ㅣㅁ넝라ㅣ먼어리ㅗ마넝로ㅓㅏㅁ농라ㅓ모
								</li>
								<li>
									이ㅏㄴ러미ㅏㅇ너라ㅣㅁ넝라ㅣ먼어리ㅗ마넝로ㅓㅏㅁ농라ㅓ모
								</li>
								<li>
									이ㅏㄴ러미ㅏㅇ너라ㅣㅁ넝라ㅣ먼어리ㅗ마넝로ㅓㅏㅁ농라ㅓ모
								</li>
								<li>
									이ㅏㄴ러미ㅏㅇ너라ㅣㅁ넝라ㅣ먼어리ㅗ마넝로ㅓㅏㅁ농라ㅓ모
								</li>
								<li>
									이ㅏㄴ러미ㅏㅇ너라ㅣㅁ넝라ㅣ먼어리ㅗ마넝로ㅓㅏㅁ농라ㅓ모
								</li>
								<li>
									이ㅏㄴ러미ㅏㅇ너라ㅣㅁ넝라ㅣ먼어리ㅗ마넝로ㅓㅏㅁ농라ㅓ모
								</li>
								<li>
									이ㅏㄴ러미ㅏㅇ너라ㅣㅁ넝라ㅣ먼어리ㅗ마넝로ㅓㅏㅁ농라ㅓ모
								</li>
								<li>
									이ㅏㄴ러미ㅏㅇ너라ㅣㅁ넝라ㅣ먼어리ㅗ마넝로ㅓㅏㅁ농라ㅓ모
								</li>
								<li>
									이ㅏㄴ러미ㅏㅇ너라ㅣㅁ넝라ㅣ먼어리ㅗ마넝로ㅓㅏㅁ농라ㅓ모
								</li>
								<li>
									이ㅏㄴ러미ㅏㅇ너라ㅣㅁ넝라ㅣ먼어리ㅗ마넝로ㅓㅏㅁ농라ㅓ모
								</li>
								<li>
									이ㅏㄴ러미ㅏㅇ너라ㅣㅁ넝라ㅣ먼어리ㅗ마넝로ㅓㅏㅁ농라ㅓ모
								</li>
								<li>
									이ㅏㄴ러미ㅏㅇ너라ㅣㅁ넝라ㅣ먼어리ㅗ마넝로ㅓㅏㅁ농라ㅓ모
								</li>
								<li>
									이ㅏㄴ러미ㅏㅇ너라ㅣㅁ넝라ㅣ먼어리ㅗ마넝로ㅓㅏㅁ농라ㅓ모
								</li>
								<li>
									이ㅏㄴ러미ㅏㅇ너라ㅣㅁ넝라ㅣ먼어리ㅗ마넝로ㅓㅏㅁ농라ㅓ모
								</li>
								<li>
									이ㅏㄴ러미ㅏㅇ너라ㅣㅁ넝라ㅣ먼어리ㅗ마넝로ㅓㅏㅁ농라ㅓ모
								</li>
								<li>
									이ㅏㄴ러미ㅏㅇ너라ㅣㅁ넝라ㅣ먼어리ㅗ마넝로ㅓㅏㅁ농라ㅓ모
								</li>
								<li>
									이ㅏㄴ러미ㅏㅇ너라ㅣㅁ넝라ㅣ먼어리ㅗ마넝로ㅓㅏㅁ농라ㅓ모
								</li>
								<li>
									이ㅏㄴ러미ㅏㅇ너라ㅣㅁ넝라ㅣ먼어리ㅗ마넝로ㅓㅏㅁ농라ㅓ모
								</li>
							</ul>
						</div>
					</div>
				</div>
			</main>

			<ScrollRestoration />
		</div>
	);
};

export default UserPage;
