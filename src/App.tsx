import React, { useState } from "react";
import TodoHeader from "./components/TodoHeader";
import { addTodo, deleteTodo, updateTodo } from "./store/modules/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/config/configStore";

const App: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");

  const selectTodo = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch<AppDispatch>();

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value);
  const onChangeText = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setText(event.target.value);

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(addTodo({ text, title }));

    setText("");
    setTitle("");
  };

  console.log(selectTodo);

  const deleteTodoHandler = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const changeTodoHandler = (id: string) => {
    dispatch(updateTodo(id));
  };

  return (
    <>
      <TodoHeader />

      <form onSubmit={onSubmitHandler}>
        <input type="text" onChange={onChangeTitle} value={title} />
        <textarea onChange={onChangeText} value={text} />
        <button type="submit">버튼</button>
      </form>

      {selectTodo
        .filter((data) => data.isDone)
        .map((data) => (
          <div key={data.id}>
            <h1>{data.text}</h1>
            <p>{data.title}</p>
            <button onClick={() => deleteTodoHandler(data.id)}>삭제</button>
            <button onClick={() => changeTodoHandler(data.id)}>시작</button>
          </div>
        ))}

      {selectTodo
        .filter((data) => !data.isDone)
        .map((data) => (
          <div key={data.id}>
            <h1>{data.text}</h1>
            <p>{data.title}</p>
            <button onClick={() => deleteTodoHandler(data.id)}>삭제</button>
            <button onClick={() => changeTodoHandler(data.id)}>종료</button>
          </div>
        ))}
    </>
  );
};

export default App;
