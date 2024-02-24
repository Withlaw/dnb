export const readImages = async (files: FileList) => {
	const images: Array<string | ArrayBuffer | null> = [];
	for (const image of files) {
		const result = await readFileAsDataURL(image);
		images.push(result);
	}

	function readFileAsDataURL(file: File): Promise<string | ArrayBuffer | null> {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onloadend = () => {
				// if (!e.target) return null;
				// resolve(e.target?.result);
				resolve(reader.result);
			};
			reader.onerror = () => {
				console.error('Failed to read file');
				reject(null);
			};
			reader.readAsDataURL(file);
		});
	}

	return images;
};

/*
// Form validation lacacy code

class FormValidation {
  isValid = true;
  errorMessage = 'Invalid'
  data:{[name:string]:string} = {};
  target = '';

  constructor(data:{[k:string]:string}){
    this.data = data;
  }

  private error(message:string) {
    this.isValid = false;
    this.errorMessage = message;
  }

  get() {
    return {
      isValid:this.isValid,
      errorMessage:this.errorMessage,
    }
  }

  validate(value:string) {
    if(!this.data?.[value])throw new Error('해당하는 대상을 찾을 수 없습니다.'); // validation target error

    this.target = this.data[value];
    return this;
  }

  isNotEmpty() {
    if( this.target.trim() === '') {
      // this.error(`${this.target}를 작성해주세요.`);
      this.error(`${this.target}를 작성해주세요.`);
      return null;
    }
    return this;
}
  isNumber() {
    if(typeof this.target !== 'number') {
      this.error(`${this.target}에 숫자만 입력해주세요.`);
      return null;
    }
    return this;
  }
}
class NewBookFormModel extends FormValidation {
  private	readonly title: string;
  private readonly author: string;
  private	readonly publisher: string;
  private	readonly fee: number;
  private	readonly description: string;
  private	readonly imageUrl= '';
  private	readonly id = 11;
  private	readonly createdAt = '14';
  private readonly merchantName = 'merchantname'
  private readonly status = '대여 가능'

  constructor(data:{[k:string]:string}){
    super(data);
    this.title = data.title as string;
    // this.author = data.author;
    this.author = '작가';
    // this.publisher = data.publisher;
    this.publisher = '출판사';
    this.fee = +data.fee;
    this.description = data.description;
  }
}

const useFormValidation () => {
  const formRef = useRef<HTMLFormElement>(null);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    const newBook = new NewBookFormModel(data as { [k: string]: string });
    // formdata의 FormDataEntryValue 타입에서 File 타입은 제외하고 string만 받음.
    // 나중에 이미지파일은 따로 작성해야할듯?
  
    const result = newBook.validate('title').isNotEmpty()?.get();
    // const {isValid:isAuthorValid} = newBook.validate('author').isNotEmpty().get();
    // const {isValid:isPublisherValid} = newBook.validate('publisher').isNotEmpty().get();
    // const {isValid:isFeeValid} = newBook.validate('fee').isNotEmpty()?.isNotEmpty.get();
    // const {isValid:isDescriptionValid} = newBook.validate('description').isNotEmpty().get();
  
    for (const name in data) {
      const { isValid } =
        newBook.validate(name).isNotEmpty()?.get() ?? newBook.get();
      if (isValid) continue;
  
      alert(`${name} 칸을 작성해주세요.`);
      formRef.current?.[name].focus(); // 오류 발생한 폼 요소 포커싱
      return;
    }

    // submit
  };

}

const formValidate () => {
  const errors = {};

  if (!isValidText(data.title)) {
    errors.title = 'Invalid title.';
  }

  if (!isValidText(data.description)) {
    errors.description = 'Invalid description.';
  }

  if (!isValidDate(data.date)) {
    errors.date = 'Invalid date.';
  }

  if (!isValidImageUrl(data.image)) {
    errors.image = 'Invalid image.';
  }

  if (Object.keys(errors).length > 0) {
    alert('Form Invalid');
    console.error(errors);
    };
  }
*/
