import { HttpClient } from '@/adapters/api/http-client.ts';

class Fetch {
	readonly baseUrl: string;
	readonly apiKey: string | undefined;
	readonly time: number;

	constructor({
		baseUrl,
		apiKey,
		time = 3000,
	}: {
		baseUrl: string;
		apiKey?: string;
		time?: number;
	}) {
		this.baseUrl = baseUrl;
		this.apiKey = apiKey;
		this.time = time;
	}

	protected _timeout(sec: number): Promise<Response> {
		return new Promise(function (_, reject) {
			setTimeout(function () {
				reject(new Error(`Request took too long! Timeout after ${sec} second`));
			}, sec);
		});
	}

	protected _fetch(
		// endpoint: RequestInfo | URL,
		endpoint: string,
		configs?: RequestInit,
	): Promise<Response> {
		// <fetch 횡단 관심사 설정>
		// 네트워크 요청 제한시간 설정
		return Promise.race([
			window.fetch(this.baseUrl + endpoint, configs),
			this._timeout(this.time),
		]);
	}
}

export class FetchClient extends Fetch implements HttpClient {
	constructor(baseUrl: string, apiKey?: string) {
		super({ baseUrl, apiKey, time: 5000 });
	}

	async get<T = any>(endpoint: string): Promise<T> {
		const res = await this._fetch(endpoint, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (!res.ok)
			throw {
				status: res.status,
				statusText: res.statusText,
				message: 'FetchClient Could not get data.',
			};
		// throw new Error("FetchClient fetching Error");
		// throw new Response("Could not find resouce.", {
		// status: res.status,
		// statusText: res.statusText,
		// });

		const data = (await res.json()) as T;

		// 이 계층에서 하는 일
		// 1. http request 전역 설정 (네트워크 시간제한, res data type 등 설정)
		// 2. fetch api나 axios api나 모든 요청으로부터 일관된 response data를 반환.
		// 에러는 ?
		// - 잘못된 url
		// - 찾는 리소스 존재하지 않음
		// - 네트워크 연결 불량
		// -> 서비스 레이어에서 모두 처리해도 될 듯?
		return data;
	}
}

export class NaverAPiClient extends Fetch implements HttpClient {
	private readonly resource: string;

	constructor(baseUrl: string, resource: string) {
		super({ baseUrl });
		this.resource = resource;
	}

	get(endpoint: string): Promise<Response> {
		return this._fetch(this.resource + endpoint, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}
	// async get<T=any>(endpoint: string): Promise<T> {
	// 	const res = await this._fetch(this.resource+endpoint, {
	//     headers: {
	//       'Content-Type': 'application/json',
	//       'X-Naver-Client-Id': this.clientID,
	//       'X-Naver-Client-Secret':this.clientPW,
	//     },
	//   });
	//   if (!res.ok) throw ({ status: res.status, statusText: res.statusText, message: "NaverBookSearchAPiClient could not get data."});

	// 	const data = (await res.json()) as T;

	// 	return data;
	// }
}
