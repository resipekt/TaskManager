import React from 'react'
import { Form } from 'react-bootstrap'


export default function Todo({todo, toggleTodo}) {
  function handleChange(){
    toggleTodo(todo.id)
  }
    return (
    <Form>
      <Form.Check 
        type="checkbox"
        label={todo.name}
        checked={todo.completed}
        onChange={handleChange}
      />
    </Form>
  )
}
