import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Todos from './components/Todos'
import { InputGroup, Form, Button, Row, Table } from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import Completed from './components/Completed';

function App() {

  const LOCAL_STORAGE_KEY = "todos.local-storage"
  const COMPLETED_TASKS = "completed-todos.local-storage"
  const [todos, setTodos] = useState(() => {
    return (JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
      || [])
  })
  const inputFieldRef = useRef();
  const [completed, setCompleted] = useState(() => {
    return (JSON.parse(localStorage.getItem(COMPLETED_TASKS)) || [])
  })

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  useEffect(() => {
    localStorage.setItem(COMPLETED_TASKS, JSON.stringify(completed))
  }, [completed])

  function toggleTodo(id) {
    const newTodos = [...todos]
    let todo = newTodos.find(iter => iter.id === id)
    todo.completed = !todo.completed
    setTodos(newTodos)
  }

  function handleAddTodo() {
    const name = (inputFieldRef.current.value);
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuid(), name: name, completed: false }]
    })
    inputFieldRef.current.value = ''
  }

  function handleRemoveChecked() {
    let newTodos = [...todos]
    let newCompleted = [...todos]
    newTodos = newTodos.filter(item => item.completed !== true)
    newCompleted = newCompleted.filter(iter => item.completed === true)
    setTodos(newTodos)
    setCompleted(newCompleted)
  }
  // Event listener for Enter key's
  useEffect(() => {
    const listener = event => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        console.log("Enter key was pressed. Run your function.");
        event.preventDefault();
        handleAddTodo();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);


  return (
    <div className="container mt-2 mb-2">
      <Row className='text-center mb-1'>
        <h1>TODO App</h1>
      </Row>
      <Row className='text-center mb-2'>
        <h5>You have {todos.length} tasks left!</h5>
      </Row>
      <Row className='mb-2'>
        <Todos todos={todos} toggleTodo={toggleTodo} />
      </Row>
      <Row className='mb-2'>
        <InputGroup>
          <Form.Control
            placeholder="Enter your ToDo here..."
            aria-label="Todo task input field"
            ref={inputFieldRef}
          />
          <Button variant="primary" onClick={handleAddTodo} type="submit">Add ToDo</Button>
          <Button variant="danger" onClick={handleRemoveChecked}>Clear completed</Button>
        </InputGroup>
      </Row>
      <Row className='mb-2 text-center'>
        <h2>Completed tasks:</h2>
      </Row>
      <Row className='text-center'>
        {/* TODO: Add completed form */}
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Task Name</th>

              <th>Completed date</th>
            </tr>
          </thead>
          <tbody>
            {/* map thru all completed tab, draw <tr> for each item with <td>:Number <td>:Name <td>Date*/}
            {if(completed.length > 0) {
                  completed.map((item) => {
                  return <Completed task={item}/>
              })}
          </tbody>
        </Table>
      </Row>
    </div>
  )
}

export default App
