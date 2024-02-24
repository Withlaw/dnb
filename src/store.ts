import { configureStore } from '@reduxjs/toolkit';

import confirmationReducer from '@/slices/confirmation.slice.ts';
import notificationReducer from '@/slices/notification.slice.ts';

const store = configureStore({
	reducer: {
		notification: notificationReducer,
		confirmation: confirmationReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
