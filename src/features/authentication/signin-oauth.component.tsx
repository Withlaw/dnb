import icons from '@/assets/icons.svg';
import useOauthWith from '@/features/authentication/use-oauth.hook.ts';
import useNotice from '@/features/notification/use-notice.hook.ts';

const SinginWithOauth = ({ provider }: { provider: 'github' }) => {
	const { login } = useOauthWith(provider);
	const { notify } = useNotice();

	const signinHandler = () => {
		notify('준비 중인 서비스 입니다.', { type: 'error' });
		// login();
	};

	return <Button provider={provider} onClick={signinHandler} />;
};

function Button({
	provider,
	onClick,
}: {
	provider: 'github';
	onClick: () => void;
}) {
	return (
		<button
			onClick={onClick}
			className="my-3 flex w-full cursor-pointer items-center justify-center space-x-2 rounded-md border border-solid border-stone-300 px-2 py-2 text-center text-xs outline-none hover:bg-stone-100">
			<svg className="size-4 " viewBox="0 0 100 100">
				<use href={`${icons}#${provider}`}></use>
			</svg>

			<span className="truncate ">
				Continue with <span className="capitalize">{provider}</span>
			</span>
		</button>
	);
}

export default SinginWithOauth;
