import React, { useState } from 'react';

import './App.css';
import TodoHeader from './components/TodoHeader';


interface Todo {
  id: string;
  title: string;
  text:string;
  isDone:boolean;
}



const App:React.FC =  () => {

  const [title,setTitle] = useState<string>('');
  const [text,setText] = useState<string>('');
  const [isDone,setIsDone] = useState<boolean>(false);
  const [todoData , setTodoData] = useState<Todo[]>([]);
  

  const onChangeTitle = (event:React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value);
  const onChangeText = (event:React.ChangeEvent<HTMLTextAreaElement>) => setText(event.target.value);

  const onSubmitHandler = (event:any) => {
      event.preventDefault();

     setTodoData([ {id:crypto.randomUUID(), title,text, isDone, } ,...todoData ])

    setText('')
    setTitle('')
  }


const deleteTodoButtonClick = (id:any) => setTodoData(   todoData.filter((todo:any)=> todo.id !== id) );


  
const  changeTodoStateHandler = (id:any) => {  
  
  setTodoData(todoData.map((todo:any) =>{ 
    if(todo.id === id){
       return { ...todo , isDone : !todo.isDone}
    }
      return todo
    }))
  
    console.log(todoData);
  

  
  }




  return (


     <>
      <TodoHeader/>

      <form onSubmit={onSubmitHandler}>
        <input type="text"  onChange={onChangeTitle} value={title} />
        <textarea  onChange={onChangeText} value={text} />
        <button type='submit'>버튼</button>
      </form>
   
    
    <div>
      <h1>워킹</h1>
    {todoData.filter((todo)=>todo.isDone ).map((todo)=>(
         <div key={todo.id}>
            <p>{todo.text}</p>
            <p>{todo.title}</p>
             <button  onClick={()=>{deleteTodoButtonClick(todo.id)}}>삭제</button>
             <button onClick={()=>{changeTodoStateHandler(todo.id)}} >시작</button>
         </div>
      ))}
    </div>
     
    <div>
      <h1>다 되었드아</h1>
      {todoData.filter((todo)=>!todo.isDone ).map((todo)=>(
         <div key={todo.id}>
            <p>{todo.text}</p>
            <p>{todo.title}</p>
             <button  onClick={()=>{deleteTodoButtonClick(todo.id)}}>삭제</button>
             <button onClick={()=>{changeTodoStateHandler(todo.id)}}>종료</button>
         </div>
      ))}
    </div>
    
    
      
     </>
  );
}

export default App;
