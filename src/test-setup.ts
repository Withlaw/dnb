import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';
import { beforeAll, afterEach, afterAll } from 'vitest';

export const handlers = [
	http.get('http://localhost:3000', async () => {
		return HttpResponse.json([{ name: 'test', value: 'test' }], {
			status: 200,
		});
	}),
	http.get('http://localhost:3000', () => {
		return new HttpResponse(null, { status: 500 });
	}),
];
// This configures a request mocking server with the given request handlers.
export const server = setupServer(...handlers);

// Establish API mocking before all tests.
// 테스트 실행 전 mock 서버 실행, 모든 테스트가 끝나면 mock 서버 종료
// 각 테스트가 끝나면 핸들러 초기화 및 렌더링된 컴포넌트 언마운트

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => {
	server.resetHandlers();
	cleanup();
});
