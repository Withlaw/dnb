import useUser from '@/features/authentication/use-user.hook.ts';
import UserInfo from '@/features/authentication/user-info.componen.tsx';

const UserDetail = () => {
	const { user } = useUser();

	return (
		user && (
			<div className="flex flex-col">
				<UserInfo user={user} />

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
