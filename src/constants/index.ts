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

export const API_NAVER = {
  BASE_URL : isDevMode ? '/api/v1' : import.meta.env.VITE_API_NAVER_BOOK_SEARCH_BASE_URL,
  BOOK_SEARCH_ID : import.meta.env.VITE_API_NAVER_BOOK_SEARCH_ID,
  BOOK_SEARCH_PW : import.meta.env.VITE_API_NAVER_BOOK_SEARCH_PW
}

export const RENT = {
  DURATION : 10,
}