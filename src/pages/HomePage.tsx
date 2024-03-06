import React from "react";
import TodoHeader from "../components/TodoHeader";
import { QueryClient, useMutation, useQuery } from "react-query";
import { getTodos, newTodo, deleteTodo, patchTodo } from "../api/todos";
import useForm from "../hooks/useForm";
import styled from "styled-components";
import TodoCardList from "../components/TodoCardList";

const HomePage: React.FC = () => {
  const { content, title, onChangeContent, onChangeTitle, onReset } = useForm();
  const { data, isLoading } = useQuery(["todos"], () => getTodos());

  const queryClient = new QueryClient();

  const mutation = useMutation(newTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const todoSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    mutation.mutate({
      id: crypto.randomUUID(),
      title: title,
      content: content,
      isDone: false,
    });

    onReset();
  };

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

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <TodoHeader />

      {mutation.isLoading ? (
        "Adding todo..."
      ) : (
        <>
          {mutation.isError ? "todo를 추가하는데 실패 하였습니다." : null}

          <StForm onSubmit={todoSubmitForm}>
            <StFormInput type="text" onChange={onChangeTitle} value={title} />
            <StFormTextArea onChange={onChangeContent} value={content} />
            <StFormButton type="submit">할일 추가</StFormButton>
          </StForm>
          <TodoCardList />
        </>
      )}
    </>
  );
};
export default HomePage;

const StForm = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const StFormInput = styled.input`
  width: 25rem;
`;

const StFormTextArea = styled.textarea`
  width: 25rem;
  height: 10vh;
  margin: 10px;
`;

const StFormButton = styled.button`
  margin: 1.25rem;
  padding: 0.4rem;
`;
