// src/components/TodoList.js
import React, { useState } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editing, setEditing] = useState(null);
  const [editingText, setEditingText] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      setTodos([...todos, { text: newTask, id: Date.now() }]);
      setNewTask('');
    }
  };

  const deleteTask = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTask = (id) => {
    setEditing(id);
    const task = todos.find(todo => todo.id === id);
    setEditingText(task.text);
  };

  const saveTask = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, text: editingText } : todo));
    setEditing(null);
    setEditingText('');
  };

  return (
   <div className='bg-gradient-to-r from-black to-gray-500 h-screen p-3 '>
    <div className='rounded mx-auto  max-w-[750px] min-h-[550px] shadow-2xl bg-slate-100'>
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 mx-auto">TO-DO LIST</h1>
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-grow p-2 border rounded focus:outline-none border-slate-400 "
          placeholder="Add new task"
        />
        <button
          onClick={addTask}
          className="px-4 py-2 border border-black text-black rounded hover:bg-black hover:text-white transition-colors"
        >
          Add
        </button>
      </div>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li key={todo.id} className="flex justify-between items-center p-2 border rounded">
            {editing === todo.id ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className="flex-grow p-2 border rounded"
                />
                <button
                  onClick={() => saveTask(todo.id)}
                  className="px-4 py-2 border border-black text-black  rounded hover:bg-black hover:text-white transition-colors ml-2"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span>{todo.text}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => editTask(todo.id)}
                    className="px-4 py-2 border border-black text-black  rounded hover:bg-black hover:text-white transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(todo.id)}
                    className="px-4 py-2 border border-black text-black  rounded hover:bg-black hover:text-white transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
    </div>
    
    </div>
  );
};

export default TodoList;
