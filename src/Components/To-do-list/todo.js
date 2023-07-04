import React, { useState } from 'react'
import './todo.css'


const Todo = () => {
    // Define state variables using the useState hook
  const [tasks, setTasks] = useState([]); // Stores the array of tasks
  const [newTask, setNewTask] = useState(''); // Stores the value of the input field for new tasks
  const [filter, setFilter] = useState('all'); // Stores the current filter status

  // Function to add a new task
  const addTask = () => {
    if (newTask.trim() !== '') { // Checks if the new task is not empty or only whitespaces
      // Adds a new task to the tasks array using the spread operator
      setTasks([...tasks, { id: Date.now(), title: newTask, completed: false }]);
      setNewTask(''); // Resets the input field for new tasks
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  // Function to toggle the completed status of a task
  const toggleTask = (taskId) => {
    // Updates the tasks array by mapping through it and toggling the completed status of the matching task
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Function to delete a task
  const deleteTask = (taskId) => {
    // Updates the tasks array by filtering out the task with the matching ID
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  // Funtion to delete all tasks
  const deleteAllTasks = () => {
    setTasks([])
  };

  // Function to set the filter status
  const filterTasks = (status) => {
    setFilter(status);
  };

  // Filters the tasks array based on the current filter status
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') {
      return true; // Shows all tasks
    } else if (filter === 'completed') {
      return task.completed; // Shows only completed tasks
    } else {
      return !task.completed; // Shows only incomplete tasks
    }
  });

  return (
    <div className='todo'>
      <h1>To-Do List</h1>
      <input
        
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyPress={handleKeyPress} // New event handler to handle Enter key press
        placeholder="Enter a new task"
      />
      <button onClick={addTask}>Add Task</button>

      <div>
        {/* Buttons to filter tasks */}
        <button onClick={() => filterTasks('all')}>All</button>
        <button onClick={() => filterTasks('completed')}>Completed</button>
        <button onClick={() => filterTasks('incomplete')}>Incomplete</button>
        <button onClick={deleteAllTasks}>Delete all</button>
      </div>

      <ul>
        {/* Rendered list of filtered tasks */}
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <span className={task.completed ? 'completed' : ''}>{task.title}</span>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo
