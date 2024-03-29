import axios from "axios"
import { NewTodo , Todo } from "../types/NewTodo";



export async function getTodos():Promise<Todo[]>  {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}`);
    return response.data;
  };

export  async function addTodo(newTodo:Todo)  {
    await axios.post(`${process.env.REACT_APP_SERVER_URL}`, newTodo);
  };

export async function deleteTodo(id:string) {
    await axios.delete(`${process.env.REACT_APP_SERVER_URL}/${id}`)
  }



  export async function patchTodo({id,isDone}:NewTodo ) {    
    await axios.patch(`${process.env.REACT_APP_SERVER_URL}/${id}`,{isDone:!isDone} )
  }