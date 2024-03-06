import React, { useState } from "react";
import TodoHeader from "../components/TodoHeader";
import { QueryClient, useMutation, useQuery } from "react-query";
import {
  deleteTodo,
  getTodos,
  newTodo,
  patchTodo,
  // patchEndTodo,
  // patchStartTodo,
} from "../api/todos";

export type NewTodo = {
  id: string;
  title: string;
  content: string;
  isDone: boolean;
};

const HomePage: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const { data, isLoading } = useQuery(["todos"], () => getTodos());

  const queryClient = new QueryClient();

  const { mutate: mutateDelete } = useMutation({
    mutationFn: deleteTodo,
    onSuccess: async () => {
      await queryClient.invalidateQueries("todos");
    },
  });

  const { mutate: mutateChange } = useMutation({
    mutationFn: patchTodo,
    onSuccess: async () => {
      await queryClient.invalidateQueries("todos");
    },
  });

  const mutation = useMutation(newTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value);
  const onChangeContent = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContent(event.target.value);

  return (
    <>
      <TodoHeader />

      {mutation.isLoading ? (
        "Adding todo..."
      ) : (
        <>
          {mutation.isError ? <div>An error occurred:error</div> : null}

          <form>
            <input type="text" onChange={onChangeTitle} value={title} />
            <textarea onChange={onChangeContent} value={content} />
            <button
              onClick={() => {
                mutation.mutate({
                  id: crypto.randomUUID(),
                  title: title,
                  content: content,
                  isDone: false,
                });
              }}
            >
              버튼
            </button>
          </form>
        </>
      )}

      <h1>시작</h1>
      {data
        ?.filter((data) => data.isDone)
        .map((data) => (
          <div key={data.id}>
            <h1>{data.title}</h1>
            <p>{data.content}</p>
            <button
              onClick={() => {
                mutateDelete(data.id);
              }}
            >
              삭제
            </button>
            <button
              onClick={() => {
                mutateChange({ id: data.id, isDone: true, title, content });
              }}
            >
              종료
            </button>
          </div>
        ))}

      <h1>종료</h1>
      {data
        ?.filter((data) => !data.isDone)
        .map((data) => (
          <div key={data.id}>
            <h1>{data.title}</h1>
            <p>{data.content}</p>
            <button
              onClick={() => {
                mutateDelete(data.id);
              }}
            >
              삭제
            </button>
            <button
              onClick={() => {
                mutateChange({ id: data.id, isDone: false, title, content });
              }}
            >
              시작
            </button>
          </div>
        ))}
    </>
  );
};
export default HomePage;
