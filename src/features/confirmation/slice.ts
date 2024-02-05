import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Confirm } from '@/features/confirmation/types.ts';

const initialState: Confirm = {
	message: '',
	isActive: false,
	isConfirmed: false,
	confirmCallback: '',
};

const confirmationSlice = createSlice({
	name: 'confirmationSlice',
	initialState,
	reducers: {
		onAct: (state, action: PayloadAction<Pick<Confirm, 'message'>>) => {
			state.message = action.payload.message;
			state.isActive = true;
		},
		unAct: state => {
			state.message = '';
			state.isActive = false;
			state.confirmCallback = '';
		},
		onConfirm: state => {
			// state.confirmCallback();
			state.message = '';
			state.isActive = false;
		},
	},
	// extraReducers: builder => {
	// 	builder.addCase(confirmationSlice.actions.onAct, (state, action) => {
	// 		console.log('thunk ', state);
	// 	});
	// },
});

const {
	onAct: activateConfirm,
	unAct: disableConfirm,
	onConfirm,
} = confirmationSlice.actions;

export { confirmationSlice, activateConfirm, disableConfirm, onConfirm };

export default confirmationSlice.reducer;
