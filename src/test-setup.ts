import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { HttpResponse, delay, http } from 'msw';
import { setupServer } from 'msw/node';
import { beforeAll, afterEach, afterAll } from 'vitest';

export const handlers = [
	http.get('', async () => {
		await delay(400);
		return HttpResponse.json([{ name: 'test', text: 'test' }], {
			status: 200,
		});
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
