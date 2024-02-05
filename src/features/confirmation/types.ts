export type Confirm = {
	message: string;
	isActive: boolean;
	isConfirmed: boolean;
	// confirmCallback: () => void;
	confirmCallback: string;
};
