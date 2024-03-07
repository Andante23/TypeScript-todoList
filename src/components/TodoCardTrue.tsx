import { useQuery, useMutation, QueryClient } from "react-query";
import { getTodos, deleteTodo, patchTodo } from "../api/todos";
import useForm from "../hooks/useForm";
import styled from "styled-components";

const TodoCardTrue = () => {
  const { data } = useQuery(["todos"], () => getTodos());

  const queryClient = new QueryClient();
  const { title, content } = useForm();
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
  return (
    <>
      <StTodoCardTrueHeader>isDone!</StTodoCardTrueHeader>
      <StTodoCardTrueTable>
        {data
          ?.filter((data) => !data.isDone)
          .map((data) => (
            <StTodoCardTrueBorder key={data.id}>
              <StTodoCardTrueBody>
                <StTodoCardTrueTitle>{data.title}</StTodoCardTrueTitle>
                <StTodoCardTrueText>{data.content}</StTodoCardTrueText>
              </StTodoCardTrueBody>

              <StTodoCardTrueButtonOption>
                <StTOdoCardTrueButtonDelete
                  onClick={() => {
                    mutateDelete(data.id);
                  }}
                >
                  삭제
                </StTOdoCardTrueButtonDelete>
                <StTOdoCardTrueButtonStart
                  onClick={() => {
                    mutateChange({
                      id: data.id,
                      isDone: false,
                      title,
                      content,
                    });
                  }}
                >
                  시작
                </StTOdoCardTrueButtonStart>
              </StTodoCardTrueButtonOption>
            </StTodoCardTrueBorder>
          ))}
      </StTodoCardTrueTable>
    </>
  );
};

export default TodoCardTrue;

const StTodoCardTrueTable = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
`;
const StTodoCardTrueBorder = styled.div`
  border-radius: 5px;
  box-shadow: 1px 1px 1px 1px gray;
  margin: 2em;
  width: 25rem;
  height: 10em;
`;

const StTodoCardTrueHeader = styled.h1`
  font-weight: bolder;
  padding: 10px;
  font-size: 22px;
`;
const StTodoCardTrueBody = styled.div`
  margin: 2rem;
  justify-content: left;
  align-items: left;
  display: flex;
  flex-direction: column;
`;

const StTodoCardTrueTitle = styled.h1`
  font-size: 25px;
  padding: 0.5rem;
  font-weight: bolder;
`;

const StTodoCardTrueText = styled.p`
  font-size: 20px;
`;

const StTodoCardTrueButtonOption = styled.div`
  margin-left: 18rem;
`;

const StTOdoCardTrueButtonDelete = styled.button`
  background-color: #ff1616;
  border-color: #ff1616;
  border-radius: 5px;
  color: #ffffff;
  padding: 0.25rem;
  &:hover {
    background-color: #ca0505;
    border-color: #ca0505;
    cursor: pointer;
  }
`;

const StTOdoCardTrueButtonStart = styled.button`
  margin-left: 20px;
  background-color: #63f063;
  border-color: #63f063;
  border-radius: 5px;
  color: #ffffff;
  padding: 0.25rem;
  &:hover {
    background-color: #3fe63f;
    border-color: #3fe63f;
    cursor: pointer;
  }
`;
