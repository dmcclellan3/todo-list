import React, { useState } from 'react'
import './App.css'


const App = () => {
  const [todo, setTodo] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

  

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
    const updatedTodo = [...todo];
    updatedTodo[index] = '+' + updatedTodo[index];
    setTodo(updatedTodo);
  };

  const handleDelete = (index) => {
    const updatedTodo = [...todo];
    updatedTodo.splice(index, 1);
    setTodo(updatedTodo);
  };

  return (
    <div className="todo-container">
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
              <button onClick={() => handleCheck(index)} className="todo-check-button">✓</button>
              <button onClick={() => handleEdit(index)} className="todo-edit-button">✎</button>
              <button onClick={() => handleDelete(index)} className="todo-delete-button">X</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
