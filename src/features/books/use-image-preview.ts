import { useEffect, useState } from "react";


const useImagePreview = (file?: FileList) => {
	const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);

  useEffect(() => {
		const image = file?.[0];
    
		if (!image) return;

		const reader = new FileReader();
		reader.onloadend = () => {
			setImagePreview(reader.result);
		};
		reader.readAsDataURL(image);

	}, [file]);

  return imagePreview
}

export default useImagePreview;