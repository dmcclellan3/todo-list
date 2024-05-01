import React, { useState } from 'react'
import './App.css'


const App = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== '') {
      if (editIndex !== -1) {
        const updatedTodos = [...todos];
        updatedTodos[editIndex] = inputValue;
        setTodos(updatedTodos);
        setInputValue('');
        setEditIndex(-1);
      } else {
        setTodos([...todos, inputValue]);
        setInputValue('');
      }
    }
  };

  const handleEdit = (index) => {
    setInputValue(todos[index]);
    setEditIndex(index);
  };

  const handleCheck = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index] = '✓ ' + updatedTodos[index];
    setTodos(updatedTodos);
  };

  const handleDelete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
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
        {todos.map((todo, index) => (
          <li key={index} className="todo-item">
            <span className="todo-text">{todo}</span>
            <div>
              <button onClick={() => handleCheck(index)} className="todo-check-button">✓</button>
              <button onClick={() => handleEdit(index)} className="todo-edit-button">✎</button>
              <button onClick={() => handleDelete(index)} className="todo-delete-button">🗑</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
