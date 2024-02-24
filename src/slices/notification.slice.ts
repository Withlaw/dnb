import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Notice, Notification } from '@/types/notification.type.ts';

const initialState: Notification = { notices: [] };

const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		add: (state, action: PayloadAction<Notice>) => {
			state.notices.push(action.payload);
		},
		delete: (state, action: PayloadAction<number>) => {
			state.notices = state.notices.filter(
				notice => notice.id !== action.payload,
			);
		},
	},
});

const { add: addNotice, delete: deleteNotice } = notificationSlice.actions;

export { notificationSlice, addNotice, deleteNotice };

export default notificationSlice.reducer;
