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
      <h1>isDone</h1>
      {data
        ?.filter((data) => !data.isDone)
        .map((data) => (
          <StTodoCardTrueBorder key={data.id}>
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
              종료
            </button>
          </StTodoCardTrueBorder>
        ))}
    </>
  );
};

export default TodoCardTrue;

const StTodoCardTrueBorder = styled.div`
  margin: 10px;
`;
