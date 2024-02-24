import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Confirm } from '@/types/confirmation.type.ts';

const initialState: Confirm = {
	message: '',
	isActive: false,
	isConfirmed: false,
};

const onConfirmCallback = createAsyncThunk(
	'confirmation/onConfirm',
	async () => {},
);

const confirmationSlice = createSlice({
	name: 'confirmation',
	initialState,
	reducers: {
		onAct: (state, action: PayloadAction<Pick<Confirm, 'message'>>) => {
			state.message = action.payload.message;
			state.isActive = true;
		},
		unAct: state => {
			state.message = '';
			state.isActive = false;
		},
		onConfirm: state => {
			state.isConfirmed = true;
		},
		// onConfirm: state => {
		// 	state.message = '';
		// 	state.isActive = false;
		// },
	},
	extraReducers: builder =>
		builder.addCase(onConfirmCallback.fulfilled, state => {
			state.message = '';
			state.isActive = false;
			state.isConfirmed = false;
		}),
});

const {
	onAct: activateConfirm,
	unAct: disableConfirm,
	onConfirm,
} = confirmationSlice.actions;

export {
	confirmationSlice,
	activateConfirm,
	disableConfirm,
	onConfirm,
	onConfirmCallback,
};

export default confirmationSlice.reducer;
