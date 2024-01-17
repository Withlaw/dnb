import { Link, Outlet, useLocation } from 'react-router-dom';

import { API_SUPABASE } from '@/constants/index.ts';

const AuthenticationPage = () => {
	const { pathname } = useLocation();
	const isLoginPage = pathname === '/sign-in';
	const isSignupPage = pathname === '/sign-up';

	return (
		<div className="flex h-dvh flex-col justify-between">
			{/* <header>header</header> */}

			<main className="mx-auto flex w-dvw flex-auto flex-col items-center justify-center border border-solid bg-stone-50 shadow-xl md:w-96">
				<div className="mb-14 flex w-full flex-col items-center justify-center text-center">
					<Link to="/">
						<img
							src={`${API_SUPABASE.BASE_URL}/storage/v1/object/public/assets/logo.png`}
							alt="logo"
							className="size-16"
						/>
						<span className="tracking-widest text-stone-700">동네북</span>
					</Link>
				</div>

				<div className="mb-2 flex w-72 flex-col">
					<h2 className="mb-2 text-xl font-semibold tracking-widest">
						{isLoginPage && '안녕하세요'}
						{isSignupPage && '반갑습니다'}
					</h2>
					<p className="text-xs tracking-wider text-stone-600">
						{isLoginPage && '로그인하시겠습니까?'}
						{isSignupPage && '회원가입하시겠습니까?'}
					</p>
				</div>

				<div className="flex w-72 flex-col">
					<div className="my-3 flex flex-col">
						<button className="my-3 w-full cursor-pointer space-x-2 rounded-md border border-solid border-stone-300 px-2 py-2 text-center text-xs outline-none hover:bg-stone-100">
							<span>아이콘</span>
							<span className="truncate ">Continue with GitHub</span>
						</button>
						{/* <button className="w-full cursor-pointer space-x-2 rounded-md border border-solid border-stone-300 px-2 py-2 text-center text-sm outline-none hover:bg-stone-100">
					<span>아이콘</span>
					<span className="truncate ">Continue with GitHub</span>
				</button> */}
					</div>

					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-solid border-stone-400"></div>
						</div>
						<div className="relative flex justify-center text-sm">
							<span className="z-1 bg-stone-50 px-2 text-xs text-stone-600">
								or
							</span>
						</div>
					</div>

					<div className="my-4">
						<Outlet />
					</div>
				</div>

				<div className="my-4 flex w-72 flex-col items-center">
					<div className="space-x-1 text-xs text-stone-600">
						{isLoginPage && <span>아이디가 아직 없으신가요?</span>}
						{isSignupPage && <span>아이디가 이미 있으신가요?</span>}

						{isLoginPage && (
							<Link to={'/sign-up'} className="font-semibold underline">
								회원가입
							</Link>
						)}
						{isSignupPage && (
							<Link to={'/sign-in'} className="font-semibold underline">
								로그인
							</Link>
						)}
					</div>
				</div>
			</main>

			{/* <footer className="flex-initial">footer</footer> */}
		</div>
	);
};

export default AuthenticationPage;
