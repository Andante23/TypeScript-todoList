import axios from "axios"
import { NewTodo } from "../pages/HomePage";

export type Todo ={
  id:string;
  title:string;
  content:string;
  isDone:boolean;
}

export async function getTodos():Promise<Todo[]>  {
    console.log("getTodos 호출");
    const response = await axios.get("http://localhost:4000/todos");
    return response.data;
  };

export  async function newTodo(newTodo:Todo)  {
    await axios.post("http://localhost:4000/todos", newTodo);
  };

export async function deleteTodo(id:string) {
    await axios.delete(`http://localhost:4000/todos/${id}`)
  }



  export async function patchTodo({id,isDone}:NewTodo ) {    
    await axios.patch(`http://localhost:4000/todos/${id}`,{isDone:!isDone} )
  }