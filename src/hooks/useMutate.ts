import { useMutation , useQueryClient } from "@tanstack/react-query";
import { deleteTodo , patchTodo } from "../api/todos";
import { useNavigate } from "react-router-dom";


function useMutate(){
                          
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate: mutateDelete } = useMutation({
        mutationFn: deleteTodo,
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey:["todos"]
          });     
        },
      });
    
      const { mutate: mutateChange } = useMutation({
        mutationFn: patchTodo,
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey:["todos"]
            
          });
     
        },
      });

    return  {mutateDelete , mutateChange}
}

export default useMutate