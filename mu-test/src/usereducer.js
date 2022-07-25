import { ActionTypes } from "@mui/base"
import e from "express"
import React,{useState,useReducer} from "react"


export default function UseReducer(){
    const[name,setName]= useState('')


    const ACTIONS ={
        ADD_TODO:'add-todo'
    }
 
    const reducer=(todos,action)=>{
        switch(action.type){
         case ACTIONS.ADD_TODO:
            return[...todos,newTodo(action.payload)]
         case 'decrement':
            return{count:state.count-1}


        }
    }

    const newTodo=(name)=>{

        return{id:Date.now,name:name,completed:false}
    }

    const[state,dispatch]=useReducer(reducer,{count:0})


    const increament=()=>{

        dispatch({type:'increment'})
    }
    const handleSubmit=()=>{
        e.preventDefault()

    dispatch({type:ACTIONS.ADD_TODO,payload:{name:name}})
    }
return(

<>
<form onSubmit={handleSubmit} >
<input type='text' value={name} onChange={e=>setName(e.target.value)}/>

</form>
</>

)


}