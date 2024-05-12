import React, { useState } from 'react';
import './App.css';

interface Todo {
  id: number;
  text: string;
}

function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>('');

  // Function to add a new todo
  const addTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: inputValue }]);
      setInputValue('');
    }
  };

  // Function to delete a todo
  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Function to edit a todo
  const editTodo = (id: number, newText: string) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, text: newText };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setEditId(null);
  };

  // Function to delete all todos
  const deleteAllTodos = () => {
    setTodos([]);
  };

  return (
    <div className="todo-app">
      <h1>Todo App</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add new todo"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {editId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => editTodo(todo.id, editText)}>Save</button>
              </>
            ) : (
              <>
                {todo.text}
                <button onClick={() => setEditId(todo.id)}>Edit</button>
              </>
            )}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={deleteAllTodos}>Delete All</button>
    </div>
  );
}

export default TodoApp;
