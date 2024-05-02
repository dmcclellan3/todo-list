import React, { useState, useEffect } from 'react'
import './App.css'


const App = () => {
  const stored = JSON.parse(localStorage.getItem('todo'))
  // console.log(stored,!!stored)
  const [todo, setTodo] = useState(stored ? stored : []);
  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(todo));
  }, [todo])


  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== '') {
      if (editIndex !== -1) {
        const updatedTodo = [...todo];
        updatedTodo[editIndex] = inputValue;
        setTodo(updatedTodo);
        setInputValue('');
        setEditIndex(-1);
      } else {
        setTodo([...todo, inputValue]);
        setInputValue('');
      }
    }
  };

  const handleEdit = (index) => {
    setInputValue(todo[index]);
    setEditIndex(index);
  };

  const handleCheck = (index) => {
    const updatedTodo = [...todo]; //Spread grabs item and makes a copy 
    updatedTodo.splice(index, 1)
    setTodo(updatedTodo)
    
    
  };

  const handleDelete = (index) => {
    const updatedTodo = [...todo];
    updatedTodo.splice(index, 1);
    setTodo(updatedTodo);
  };

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
        <button type="submit" className="todo-add-button">{editIndex !== -1 ? 'Update' : 'Add'}</button>
      </form>
      <ul className="todo-list">
        {todo.map((todo, index) => (
          <li key={index} className="todo-item">
            <span className="todo-text">{todo}</span>
            <div>
              <button onClick={() => handleCheck(index)} className="todo-check-button">✅</button>
              <button onClick={() => handleEdit(index)} className="todo-edit-button">✎</button>
              <button onClick={() => handleDelete(index)} className="todo-delete-button">🗑️</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
