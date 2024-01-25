const isDevMode = import.meta.env.DEV;
// const isProdMode = import.meta.env.PROD;

export const ROUTE_PATHS = {
	DASHBOARD: '/dashboard',
	BOOKS: '/books',
	USERS: '/users',
	SIGN: '/sign',
};

export const API_SUPABASE = {
	BASE_URL: import.meta.env.VITE_SUPABASE_BASE_URL,
	KEY: import.meta.env.VITE_SUPABASE_API_KEY,
};

export const API_SUPABASE_FUNCTIONS = {
	NAVER_BOOK_SEARCH_URL: isDevMode
		? '/api'
		: import.meta.env.VITE_SUPABASE_BASE_URL,
};

export const RENT = {
	DURATION: 10,
};
