import { useMutation , useQueryClient } from "@tanstack/react-query";
import { deleteTodo , patchTodo , addTodo } from "../api/todos";



function useMutate(){
                          
    const queryClient = useQueryClient();

    const { mutate: mutateDeleteTodo } = useMutation({
        mutationFn: deleteTodo,
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey:[`${process.env.REACT_APP_QUERY_KEY}`]
          });     
        },
      });
    
      const { mutate: mutateChangeTodo } = useMutation({
        mutationFn: patchTodo,
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey:[`${process.env.REACT_APP_QUERY_KEY}`]
            
          });
     
        },
      });

      const mutation = useMutation({
        mutationFn: addTodo,
        onError: () => {
          alert("there was an error");
        },
        onSettled: () => {
          queryClient.invalidateQueries({
            queryKey: [`${process.env.REACT_APP_QUERY_KEY}`],
          });
        },
      });
  
    return  {mutateDeleteTodo , mutateChangeTodo , mutation }
}

export default useMutate