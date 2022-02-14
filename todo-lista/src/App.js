import React, { useState, useRef } from 'react';
import './App.css';

function Task({ task, completeTask, deleteTask }) {
  function handleTaskClick() {
    completeTask(task.id)
  }

  function handleDeleteClick() {
    deleteTask(task.id)
  }

  if (!task.completed){
    return (
      <div class="general" >  
        <button class="task" onClick={handleTaskClick}>{task.name}</button>
        <button class="deleteTask" onClick={handleDeleteClick}>X</button>
      </div>
    )
  }

  return (
    <div class ="general" >  
      <button class="taskDone" onClick={handleTaskClick}><del>{task.name}</del></button>
      <button class="deleteTask" onClick={handleDeleteClick}>X</button>
    </div>
  )
}

function TodoList({ todoList, completeTask, deleteTask }) { 
  return (
    todoList.map(task => {
      return <Task
        key={task.id}
        completeTask={completeTask}
        deleteTask={deleteTask}
        task={task}
        />
    })
  )
}

function App() {
  const [tasks, setTasks] = useState([])
  const taskNameRef = useRef()

  function completeTask(id) {
    const newTasks = [...tasks]
    const task = newTasks.find(task => task.id === id)
    task.completed = !task.completed
    setTasks(newTasks)
  }

  function deleteTask(id) {
    const newTasks = tasks.filter((task) => task.id !== id)
    setTasks(newTasks)
  }

  function handleAddTask(e) {
    const name = taskNameRef.current.value
    if (name === '') return
    setTasks(prevTasks => {
      return [...prevTasks, {id: name, name: name, completed: false}]
    })
    taskNameRef.current.value = null
  }

  function handleSort() {
    const taskList = [...tasks]
    taskList.forEach(value => {
      console.log(value)
    })
    taskList.sort((a, b) => {
      if (a.name < b.name) {
        return -1
      } else if (a.name > b.name) {
        return 1
      }
    })
    setTasks(taskList) 
  }

  function handleDeleteAll() {
    const newTasks = []
    setTasks(newTasks)
  }

  return (
    <>
      <h1 >Todo-lista</h1>
      <input type="text" placeholder='Lisää uusi tehtävä...' ref={taskNameRef}  />
      <button class="newTask" onClick={handleAddTask}>+</button>
      <br />
      <TodoList 
        todoList={tasks} 
        completeTask={completeTask}
        deleteTask={deleteTask}
      />
      <button class="sort" onClick={handleSort}>Lajittele A-Ö</button>
      <button class="deleteAll" onClick={handleDeleteAll}>Poista kaikki</button>
    </>
  
  )
}

export default App;