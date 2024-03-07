import React from "react";
import TodoHeader from "../components/TodoHeader";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTodos, newTodo } from "../api/todos";
import useForm from "../hooks/useForm";
import styled from "styled-components";
import TodoCardList from "../components/TodoCardList";
const HomePage: React.FC = () => {
  const { content, title, onChangeContent, onChangeTitle, onReset } = useForm();
  const { isLoading } = useQuery({
    queryKey: ["todos"],
    initialData: [],
    queryFn: () => getTodos(),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: newTodo,
    onError: () => {
      alert("there was an error");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
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

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <TodoHeader />

      {mutation.isPending ? (
        "Adding todo..."
      ) : (
        <>
          {mutation.isError ? "todo를 추가하는데 실패 하였습니다." : null}

          <StTodoForm onSubmit={todoSubmitForm}>
            <StTodoFormInput
              type="text"
              onChange={onChangeTitle}
              value={title}
              placeholder="text를 입력해주세요"
            />
            <StTodoFormTextArea
              onChange={onChangeContent}
              value={content}
              placeholder="textArea를 입력해주세요"
            />
            <StTodoFormButton type="submit">할일 추가</StTodoFormButton>
          </StTodoForm>

          <TodoCardList />
        </>
      )}
    </>
  );
};
export default HomePage;

const StTodoForm = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const StTodoFormInput = styled.input`
  width: 25rem;
`;

const StTodoFormTextArea = styled.textarea`
  width: 25rem;
  height: 10vh;
  margin: 10px;
`;

const StTodoFormButton = styled.button`
  margin: 1.25rem;
  padding: 0.4rem;
  background-color: #1677ff;
  border-color: #1677ff;
  border-radius: 5px;
  color: #ffffff;
  &:hover {
    background-color: #3b85ee;
    border-color: #3b85ee;
    cursor: pointer;
  }
`;
