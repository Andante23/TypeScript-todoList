import { Todo } from "../App";

interface TodoProps {
  headerTitle: string;
  todo: Todo[];
  deleteTodoHandler(id: string): void;
  changeTodoStateHandler(id: string): void;
}

const TodoItems = ({
  headerTitle,
  todo,
  deleteTodoHandler,
  changeTodoStateHandler,
}: TodoProps) => {
  return (
    <>
      <div>
        <h1>{headerTitle}</h1>

        {todo.map((data) => (
          <div key={data.id}>
            <h1>{data.title}</h1>
            <p>{data.text}</p>
            <button
              onClick={() => {
                deleteTodoHandler(data.id);
              }}
            >
              삭제
            </button>
            <button
              onClick={() => {
                changeTodoStateHandler(data.id);
              }}
            >
              {data.isDone ? "시작" : "종료"}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default TodoItems;
