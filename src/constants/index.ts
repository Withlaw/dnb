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

export const API_NAVER = {
  BOOK_SEARCH_ID:import.meta.env.VITE_API__NAVER_BOOK_SEARCH_ID,
  BOOK_SEARCH_PW:import.meta.env.VITE_API__NAVER_BOOK_SEARCH_PW
}