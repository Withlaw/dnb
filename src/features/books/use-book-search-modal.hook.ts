import { useCallback, useState } from 'react';

const useBookSearchModal = () => {
	const [isShowModal, setIsShowModal] = useState(false);

	const modalHandler = useCallback(() => {
		setIsShowModal(prevVal => !prevVal);
	}, []);

	return { isShowModal, modalHandler };
};

export default useBookSearchModal;
