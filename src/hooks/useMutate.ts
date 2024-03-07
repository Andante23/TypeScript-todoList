import { useMutation , QueryClient } from "react-query";
import { deleteTodo , patchTodo } from "../api/todos";


function useMutate(){

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

    return  {mutateDelete , mutateChange}
}

export default useMutate