import { HttpClient } from '@/adapters/api/http-client.ts';

export default class FetchClient implements HttpClient {
	readonly baseURL: string;
	readonly apiKey?: string;

	constructor(baseURL: string, apiKey?: string) {
		this.baseURL = baseURL;
		this.apiKey = apiKey;
	}

	private _timeout(sec: number): Promise<Response> {
		return new Promise(function (_, reject) {
			setTimeout(function () {
				reject(new Error(`Request took too long! Timeout after ${sec} second`));
			}, sec * 1000);
		});
	}

	private _fetch(
		endpoint: RequestInfo | URL,
		configs?: RequestInit,
	): Promise<Response> {
		// fetch 횡단 관심사 설정

		return Promise.race([
			window.fetch(this.baseURL + (endpoint as string), {
				...configs,
				headers: {
					'Content-Type': 'application/json',
				},
			}),
			this._timeout(5),
		]);
		// return  window.fetch(this.baseURL + endpoint, {
		//   ...configs,
		//   headers: {
		//     "Content-Type": "application/json",
		//   },
		// });
	}

	async get<T = any>(endpoint: string): Promise<T> {
		const res = await this._fetch(endpoint);
		// if(!res.ok) throw~

		// console.log("fetch client get res: ", res);
		const data = (await res.json()) as T;

		// 이 계층에서 하는 일
		// 1. http request 전역 설정.
		// 2. fetch api나 axios api나 모든 요청으로부터 일관된 response data를 반환.
		// 에러는 ?
		// - 잘못된 url
		// - 찾는 리소스 존재하지 않음
		// - 네트워크 연결 불량
		// -> 서비스 레이어에서 모두 처리해도 될 듯?
		return data;
	}
}
