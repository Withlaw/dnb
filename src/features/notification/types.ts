export type Notice = {
	id: number;
	type: 'success' | 'error';
	message: string;
};

export type Notification = {
	notices: Notice[];
};

export type NotifyOptions = {
	type?: 'success' | 'error';
	time?: number;
};
