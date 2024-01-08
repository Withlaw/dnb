import { useRef, useState } from "react";

const useSearchForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
	const [inputValue, setInputValue] = useState('');

	const isInputChange = inputValue.trim() !== '';

	const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.currentTarget;
		if (value.trim() === inputValue.trim()) return; // 띄어쓰기만 할 경우 싹 무시.
		setInputValue(value);
	};

  return {formRef, inputValue, inputChangeHandler, isInputChange};
}

export default useSearchForm;