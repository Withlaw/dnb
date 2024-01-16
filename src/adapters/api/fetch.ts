import { HttpClient } from '@/adapters/api/http-client.ts';

class Fetch  {
	readonly baseURL: string;
	readonly apiKey: string;
  readonly time:number;

	constructor({ baseURL , apiKey = '' , time = 3000 }:{baseURL: string, apiKey?: string, time?:number}) {
		this.baseURL = baseURL;
		this.apiKey = apiKey ?? '';
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
    endpoint:string,
		configs?: RequestInit,
	): Promise<Response> {
		// <fetch 횡단 관심사 설정>
    // 네트워크 요청 제한시간 설정
		return Promise.race([
			window.fetch(this.baseURL+endpoint, configs),
			this._timeout(this.time),
		]);
	}
}

export class FetchClient extends Fetch implements HttpClient {
	constructor(baseURL: string, apiKey: string) {
    super({baseURL, apiKey, time:5000});
	}

	async get<T=any>(endpoint: string): Promise<T> {
		const res = await this._fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) throw ({ status: res.status, statusText: res.statusText, message: "FetchClient Could not get data."});
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

type NaverAPiClientOptions = {
  id:string;
  pw:string
}

export class NaverAPiClient extends Fetch implements HttpClient {
  private readonly clientID :string;
  private readonly clientPW :string;
  private readonly resource :string;

  constructor(resource:string, options:NaverAPiClientOptions) {
    super({ baseURL : '/api/v1' });
    // 빌드시 /api => https://openapi.naver.com로 수정
    this.resource = resource;
    this.clientID = options.id;
    this.clientPW = options.pw
	}

  get(endpoint: string):Promise<Response> {
		return this._fetch(this.resource+endpoint, {
      headers: {
        'Content-Type': 'application/json',
        'X-Naver-Client-Id': this.clientID,
        'X-Naver-Client-Secret':this.clientPW,
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
