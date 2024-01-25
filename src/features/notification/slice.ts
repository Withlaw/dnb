import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type NoticeMessage = {
	id: number;
	message: string;
};

type Notification = {
	messages: NoticeMessage[];
};

const initialState: Notification = { messages: [] };

const notificationSlice = createSlice({
	name: 'notificationSlice',
	initialState,
	reducers: {
		add: (state, action: PayloadAction<NoticeMessage>) => {
			state.messages.push(action.payload);
		},
		delete: state => {
			state.messages.shift();
		},
	},
});

const { add: addNotice, delete: deleteNotice } = notificationSlice.actions;

export { notificationSlice, addNotice, deleteNotice };

export default notificationSlice.reducer;
