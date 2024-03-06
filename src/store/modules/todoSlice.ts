import {createSlice,PayloadAction} from "@reduxjs/toolkit"
import type { RootState } from "../config/configStore"


// 투드리스트를 전역적으로 관리할 규격을 생성
interface Todo{
    id:string,
    title:string,
    text:string,
 isDone:boolean
}


const initialState :Todo[] = [
    {
     id: crypto.randomUUID(),
     title:"test",
     text : '테스트' ,
    isDone:true,
    }
];


export const todoSlice = createSlice({
 name:'todos',
 initialState,
 reducers:{
    /**
     * todo를 추가해주는 함수입니다.
     * @param state todo의 기본값을 나타냅니다.
     * @param action 추가되는 todo를 말합니다.
     */
    addTodo: (state , action:PayloadAction<{text:string , title:string}>) => {
        state.push({id: crypto.randomUUID() ,title:action.payload.text , text: action.payload.title , isDone:false})
    },
    /**
     * todo를 삭제해주는 함수입니다.
     * @param state 원래todo
     * @param action 삭제할 todo의 식별자 id값 
     * @returns  삭제할 todo의 데이터가 없는 배열 
     */
    deleteTodo:(state,action:PayloadAction<string>) => {
      return  state.filter((todo)=> todo.id !== action.payload)
    },
    updateTodo:(state,action:PayloadAction<string>) => {
       state.map((todo)=>{
            if(todo.id === action.payload){
                return {...todo ,isDone:!action.payload  }
            }
            return todo
        })
    },

 }
})


export const {addTodo ,deleteTodo ,updateTodo} = todoSlice.actions

export const selectTodo = (state:RootState) => state.todos

export default todoSlice.reducer