import React from 'react'
import Todo from './Todo'

export default function Todos({todos, toggleTodo}) {
  return (
    todos.map((todo)=>{
        return <Todo toggleTodo={toggleTodo} key={todo.id} todo={todo} />
    })
  )
}
