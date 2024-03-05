import React, { useState } from "react";
import TodoHeader from "./components/TodoHeader";
import TodoItems from "./components/TodoItems";

// 여러가지 타입을 갖는 프로퍼티로 이루어진 새로운 것을 정의
// 마치  todo리스트 하나의 아이템에도  여러가지 타입을 가집
export type Todo = {
  id: string;
  title: string;
  text: string;
  isDone: boolean;
};

const App: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [todoData, setTodoData] = useState<Todo[]>([]);

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value);
  const onChangeText = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setText(event.target.value);

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTodoData([
      { id: crypto.randomUUID(), title, text, isDone: false },
      ...todoData,
    ]);

    setText("");
    setTitle("");
  };

  const deleteTodoHandler = (id: string) =>
    setTodoData(todoData.filter((todo) => todo.id !== id));

  const changeTodoStateHandler = (id: string) => {
    setTodoData(
      todoData.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isDone: !todo.isDone };
        }
        return todo;
      })
    );
  };

  const todoIsTrue = todoData.filter((data) => data.isDone);
  const todoIsFalse = todoData.filter((data) => !data.isDone);
  return (
    <>
      <TodoHeader />

      <form onSubmit={onSubmitHandler}>
        <input type="text" onChange={onChangeTitle} value={title} />
        <textarea onChange={onChangeText} value={text} />
        <button type="submit">버튼</button>
      </form>

      <TodoItems
        headerTitle="working"
        todo={todoIsTrue}
        deleteTodoHandler={deleteTodoHandler}
        changeTodoStateHandler={changeTodoStateHandler}
      />

      <TodoItems
        headerTitle="False"
        todo={todoIsFalse}
        deleteTodoHandler={deleteTodoHandler}
        changeTodoStateHandler={changeTodoStateHandler}
      />
    </>
  );
};

export default App;
