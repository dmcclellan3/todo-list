import React, { useState, useEffect } from 'react'
import './App.css'
import { CiTrash } from "react-icons/ci";
import { HiOutlinePencil } from "react-icons/hi";
import { IoCheckmarkOutline } from "react-icons/io5";


const App = () => {
  const stored = JSON.parse(localStorage.getItem('todo')) // Retrieve todo list from local storage
  const [todo, setTodo] = useState(stored ? stored : []); // Initialize state variables for todo list, input value, and edit index
  const [inputValue, setInputValue] = useState(''); // State variable to hold the value of the input field for adding/editing todo items
  const [editIndex, setEditIndex] = useState(-1); // State variable to hold the index of the todo item being edited (-1 means no item is being edited)

  // Update local storage when todo list changes
  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(todo));
  }, [todo])


  const handleInputChange = (event) => { //Handles input changes 
    setInputValue(event.target.value);
  };

  // Handle form submission
  const handleSubmit = (event) => { // Function for handling form submission
    event.preventDefault(); // Prevent default form submission behavior
    if (inputValue.trim() !== '') { // Check if input value is not empty after trimming whitespace
      if (editIndex !== -1) { // Check if an item is being edited
        const updatedTodo = [...todo]; // Create a copy of the todo list
        updatedTodo[editIndex] = inputValue; // Update the todo item at the edit index with the new input value
        setTodo(updatedTodo); // Update the todo list with the modified item
        setInputValue(''); // Clear the input value after submission
        setEditIndex(-1); // Reset the edit index after submission
      } else {
        setTodo([...todo, inputValue]); // Add the new todo item to the todo list
        setInputValue(''); // Clear the input value after submission
      }
    }
  };

    // Handle editing of todo item
  const handleEdit = (index) => {
    setInputValue(todo[index]);
    setEditIndex(index);
  };

  // Handle checking off todo item
  const handleCheck = (index) => { 
    const updatedTodo = [...todo]; // Create a copy of todo list
    updatedTodo.splice(index, 1) // Remove the checked item
    setTodo(updatedTodo) // Update todo list
    
  };
  // Handles deleting an item
  const handleDelete = (index) => {
    const updatedTodo = [...todo];
    updatedTodo.splice(index, 1);
    setTodo(updatedTodo);
  };
  //renders the application
  return (
    <div className="d-flex todo-container">
      <h2 className="todo-title">TaskTrack</h2>
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Add a new item"
          className="todo-input"
        />
          {/* Button to submit the form. Changes text based on whether an item is being edited */}
        <button type="submit" className="add-button">{editIndex !== -1 ? 'Update' : 'Add'}</button>
      </form>
      <ul className="todo-list">
        {todo.map((todo, index) => (
          <li key={index} className="todo-item">
            <div className="todo-text">{todo}</div>
            <div>
              <IoCheckmarkOutline onClick={() => handleCheck(index)} className="check-button" id='todo-icon' /> 
              <HiOutlinePencil  onClick={() => handleEdit(index)} className="edit-button" id='todo-icon' />
              <CiTrash onClick={() => handleDelete(index)} className="delete-button"id='todo-icon' />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
