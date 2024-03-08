import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../api/todos";
import useForm from "../hooks/useForm";
import styled from "styled-components";
import useMutate from "../hooks/useMutate";

const TodoCardTrue = () => {
  const { data } = useQuery({
    queryKey: [`${process.env.REACT_APP_QUERY_KEY}`],
    queryFn: () => getTodos(),
  });

  const { mutateDeleteTodo, mutateChangeTodo } = useMutate();
  const { title, content } = useForm();

  const deleteTodoButtonClick = (id: string) => {
    const isDelete: boolean = window.confirm(" 삭제해주시겠습니까? ");

    if (isDelete) {
      mutateDeleteTodo(id);
    } else {
      return;
    }
  };

  const changeTodoStateButtonClick = (id: string, isDone?: Boolean) => {
    const isChange: boolean = window.confirm("변경하겠습니까?");

    if (isChange) {
      mutateChangeTodo({ id, isDone: false, title, content });
    } else {
      return;
    }
  };

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
                    deleteTodoButtonClick(data.id);
                  }}
                >
                  삭제
                </StTOdoCardTrueButtonDelete>
                <StTOdoCardTrueButtonStart
                  onClick={() => {
                    changeTodoStateButtonClick(data.id);
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
