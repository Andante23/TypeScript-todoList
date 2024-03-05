import { Todo } from "../App";

interface TodoProps {
  todo: Todo;
  deleteTodoHandler(id: string): void;
  changeTodoStateHandler(id: string): void;
}

const TodoCardTrue = ({
  deleteTodoHandler,
  changeTodoStateHandler,
  todo,
}: TodoProps) => {
  return (
    <>
      <div key={todo.id}>
        <p>{todo.text}</p>
        <p>{todo.title}</p>
        <button
          onClick={() => {
            deleteTodoHandler(todo.id);
          }}
        >
          삭제
        </button>
        <button
          onClick={() => {
            changeTodoStateHandler(todo.id);
          }}
        >
          시작
        </button>
      </div>
    </>
  );
};

export default TodoCardTrue;
