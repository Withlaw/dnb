// Loading animation
const shimmer =
	'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

// 책 전체 조회 페이지
export const BooksPreviewItemSkeleton = () => {
	return (
		<li
			className={`${shimmer} backdrop:group relative my-2 w-full overflow-hidden rounded-xl border border-solid border-stone-200 p-4 shadow-md`}>
			<div className=" flex justify-between space-x-3">
				<div className="h-44 w-32 flex-none bg-gray-200 sm:h-32 sm:w-24"></div>

				<div className="flex flex-auto justify-between py-2">
					<div className="flex w-20 flex-auto flex-col items-start space-y-1">
						<div className="mb-1 h-8 w-full rounded-md bg-gray-200"></div>
						<div className="flex h-8 w-[50%] items-center space-x-2 rounded-md bg-gray-200"></div>
						<div className="flex h-8 w-[50%] items-center space-x-2 rounded-md bg-gray-200"></div>
					</div>
				</div>
			</div>
		</li>
	);
};

export const BooksPreviewItemsSkeleton = ({ num = 1 }: { num?: number }) => {
	return Array.from({ length: num }, (_, i) => (
		<BooksPreviewItemSkeleton key={i} />
	));
};

// 책 상세 페이지
export const BookDetailSkeleton = () => (
	<div className={`${shimmer} relative my-3 flex flex-col overflow-hidden`}>
		<div className={`mb-2`}>
			<div className={`flex justify-center bg-gray-100`}>
				<div className="h-80 w-64 bg-gray-200"></div>
			</div>
		</div>

		<div className="flex flex-col p-2">
			<div className="flex flex-col space-y-2 border-b border-solid py-4">
				<div className="h-10 w-full rounded-md bg-gray-200"> </div>
				<div className="h-8 w-[50%] rounded-md bg-gray-200"></div>
			</div>

			<div className="flex flex-col space-y-2 border-b border-solid py-4">
				<div className="h-8 w-[40%] rounded-md bg-gray-200"></div>
			</div>

			<div className="flex flex-col space-y-2 border-b border-solid py-4">
				<div className="h-8 w-full rounded-md bg-gray-200"></div>
			</div>
		</div>
	</div>
);

// 유저 페이지
export const UserBookSkeleton = ({ num = 1 }: { num?: number }) => {
	return Array.from({ length: num }, (_, i) => (
		<li key={i} className="flex space-x-2">
			<div className="h-24 w-20 flex-initial bg-gray-200"></div>

			<div className="flex flex-1 flex-col justify-between space-y-1 p-1">
				<div className="h-8 w-full rounded-md bg-gray-200"></div>
				<div className="h-4 w-[50%] rounded-md bg-gray-200"></div>
				<div className="h-4 w-[50%] rounded-md bg-gray-200"></div>
			</div>
		</li>
	));
};

export const UserDetailSkeleton = () => (
	<div className={`${shimmer} relative flex flex-col overflow-hidden`}>
		<div className={` flex flex-col `}>
			<div className="my-2 flex flex-none items-center space-x-3 rounded-md border border-solid border-stone-300 px-5 py-3">
				<div className="size-20 rounded-full bg-gray-200"></div>
				<div className="flex flex-auto flex-col space-y-1 p-2 text-sm">
					<div className="h-4 w-full rounded-sm bg-gray-200"></div>
					<div className="w-full] h-4 rounded-sm bg-gray-200"></div>
					<div className="h-4 w-full rounded-sm bg-gray-200"></div>
					<div className="h-4 w-full rounded-sm bg-gray-200"></div>
				</div>
			</div>

			<div className="flex flex-col space-y-2">
				<div className="flex justify-between rounded-md border border-solid border-stone-300 p-3">
					<div className="flex divide-x divide-stone-400">
						<div className="px-2">
							<div className="h-6 w-40 rounded-sm bg-gray-200 "></div>
						</div>
					</div>
				</div>

				<div className="flex flex-auto flex-col space-y-2 rounded-md border border-solid border-stone-300 p-3">
					<ul className="flex flex-col space-y-3">
						<UserBookSkeleton />
					</ul>
				</div>
			</div>
		</div>
	</div>
);
