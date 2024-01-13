import { useCallback, useState } from 'react';

const useShow = () => {
	const [isShow, setIsShow] = useState(false);

	const showHandler = useCallback(() => {
		setIsShow(prevVal => !prevVal);
	}, []);

	return { isShow, showHandler };
};

export default useShow;
