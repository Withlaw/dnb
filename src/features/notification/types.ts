export type Notice = {
	id: number;
	type: 'success' | 'error';
	message: string;
};

export type Notification = {
	notices: Notice[];
};

export type Notify = Omit<Notice, 'id'> & {
	time?: number;
};
