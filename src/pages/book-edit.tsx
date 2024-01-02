import PostForm from '@/features/books/post-form.component.tsx';
import HeaderMain from '@/ui/header-main.tsx';
import NavHeader from '@/ui/nav-header.tsx';

const BookEditPage = () => {
	return (
		<div className="container mx-auto flex h-dvh max-w-screen-sm flex-col">
			{/* <HeaderMain /> */}
			<NavHeader />
			<main className="flex-auto bg-stone-50 px-4">
				<PostForm />
			</main>
		</div>
	);
};

export default BookEditPage;
