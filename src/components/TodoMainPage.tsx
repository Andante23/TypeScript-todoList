import TodoHeader from "./TodoHeader";
import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../api/todos";
import useForm from "../hooks/useForm";
import styled from "styled-components";
import TodoCardList from "./TodoCardList";
import useMutate from "../hooks/useMutate";

const TodoMainPage: React.FC = () => {
  const { content, title, onChangeContent, onChangeTitle, onReset } = useForm();
  const { isLoading } = useQuery({
    queryKey: [`${process.env.REACT_APP_QUERY_KEY}`],

    queryFn: () => getTodos(),
  });

  const { mutation } = useMutate();

  const todoSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title.trim() !== "" && content.trim() !== "") {
      mutation.mutate({
        id: crypto.randomUUID(),
        title: title,
        content: content,
        isDone: false,
      });
    }

    if (title.trim() === "" && content.trim() === "") {
      alert("제목과 내용을 입력해주세요");
    }

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
export default TodoMainPage;

const StTodoForm = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const StTodoFormInput = styled.input`
  width: 30rem;
  height: 4em;
  border-radius: 5px;
`;

const StTodoFormTextArea = styled.textarea`
  width: 30rem;
  height: 10vh;
  margin: 10px;
  border-radius: 5px;
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
