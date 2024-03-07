import { useQuery, useMutation, QueryClient } from "react-query";
import { getTodos, deleteTodo, patchTodo } from "../api/todos";
import useForm from "../hooks/useForm";
import styled from "styled-components";

const TodoCardFalse = () => {
  const { data } = useQuery(["todos"], () => getTodos());
  console.log(data);
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
      <StTodoCardFalseHeader>False</StTodoCardFalseHeader>
      <StTodoCardFalseTable>
        {data
          ?.filter((data) => data.isDone)
          .map((data) => (
            <StTodoCardFalseBorder key={data.id}>
              <StTodoCardFalseBody>
                <StTodoCardFalseTitle>{data.title}</StTodoCardFalseTitle>
                <StTodoCardFalseText>{data.content}</StTodoCardFalseText>
              </StTodoCardFalseBody>

              <StTodoCardFalseButtonOption>
                <StTOdoCardFalseButtonDelete
                  onClick={() => {
                    mutateDelete(data.id);
                  }}
                >
                  삭제
                </StTOdoCardFalseButtonDelete>
                <StTOdoCardFalseButtonEnd
                  onClick={() => {
                    mutateChange({ id: data.id, isDone: true, title, content });
                  }}
                >
                  종료
                </StTOdoCardFalseButtonEnd>
              </StTodoCardFalseButtonOption>
            </StTodoCardFalseBorder>
          ))}
      </StTodoCardFalseTable>
    </>
  );
};

export default TodoCardFalse;

const StTodoCardFalseTable = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
`;
const StTodoCardFalseBorder = styled.div`
  border-radius: 5px;
  box-shadow: 1px 1px 1px 1px gray;
  margin: 2em;
  width: 25rem;
  height: 10em;
`;

const StTodoCardFalseHeader = styled.h1`
  font-weight: bolder;
  padding: 10px;
  font-size: 22px;
`;
const StTodoCardFalseBody = styled.div`
  margin: 2rem;
  justify-content: left;
  align-items: left;
  display: flex;
  flex-direction: column;
`;

const StTodoCardFalseTitle = styled.h1`
  font-size: 25px;
  padding: 0.5rem;
  font-weight: bolder;
`;

const StTodoCardFalseText = styled.p`
  font-size: 20px;
`;

const StTodoCardFalseButtonOption = styled.div`
  margin-left: 18rem;
`;

const StTOdoCardFalseButtonDelete = styled.button`
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

const StTOdoCardFalseButtonEnd = styled.button`
  margin-left: 20px;
  background-color: #101110;
  border-color: #101110;
  border-radius: 5px;
  color: #ffffff;
  padding: 0.25rem;
  &:hover {
    background-color: #161816d3;
    border-color: #161816d3;
    cursor: pointer;
  }
`;
