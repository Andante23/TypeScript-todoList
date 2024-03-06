import { useState } from "react";




function useForm(){
const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");


  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) =>
  setTitle(event.target.value);
  const onChangeContent = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
  setContent(event.target.value);

  
  const onReset = () => {
    setContent("");
    setTitle("");
  } 


  return { title,content , onChangeContent , onChangeTitle, onReset}
}

export default useForm