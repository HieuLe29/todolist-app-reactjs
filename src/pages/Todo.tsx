import React, { useState } from 'react';
import { useAuth } from '../components/context/AuthContext';
import { todos as initialTodos } from '../data/mockData';
import { Todo } from '../types';

export const TodoPage: React.FC = () => {
  const { user } = useAuth();
  const [todos, setTodos] = useState<Todo[]>(
    initialTodos.filter(todo => todo.userId === user?.id)
  );
  const [todoDones, setTodoDones] = useState<Todo[]>(
    initialTodos.filter(todo => todo.userId === user?.id && todo.completed)
  );

  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    const checkRepeat = todos.find((todo) => todo.text === newTodo);
      if (checkRepeat) {
        alert('Todo already exists');
        return;
      };
    if (newTodo.trim() && user) {
      const todo: Todo = {
        id: Math.max(...todos.map(t => t.id)) + 1,
        text: newTodo,
        completed: false,
        userId: user.id
      };
      console.log(todo.id);
      
      setTodos([...todos, todo]);
      setNewTodo('');
    }
  };

  const addTodoDone = (id: number) => {
    const todoDone = todos.find((todo) => todo.id === id);
    if (todoDone && user) {
      const newTodoDone: Todo = {
        id: Math.max(...todos.map(t => t.id)) + 1,
        text: todoDone.text,
        completed: false,
        userId: user.id
      };
      
      setTodoDones([...todoDones, newTodoDone]);
      setTodos(todos.filter(todo => todo.id !== id));
    }
  }

  const updateTodo = (id: number) => {
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === id) {
        const updatedTodos = todos[i];
        const updatedText = prompt('Update Todo:', updatedTodos.text);
        if (updatedText !== null) {
          updatedTodos.text = updatedText;
          const newTodos = [...todos];
          newTodos[i] = updatedTodos;
          setTodos(newTodos);
        }
        break;
      }
    }
  };

  const toggleTodo = (id: number, status: boolean) => {
    if (!status) {
      const updatedTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
      setTodos(updatedTodos);
    } else {

      const updatedTodos = todoDones.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
      setTodoDones(updatedTodos);
    }
  };


  const deleteTodo = (id: number, status: boolean) => {
    if (status) {
      setTodoDones(todoDones.filter(todo => todo.id !== id)); 
    } else {
      setTodos(todos.filter(todo => todo.id !== id));
    }
  };

  const deleteAllChoose = () => {
    const updatedTodos = todos.filter((todo) => !todo.completed);
    const updatedTodoDones = todoDones.filter((todo) => !todo.completed);
    setTodos(updatedTodos);
    setTodoDones(updatedTodoDones);
  }

  return (
    <div className="todo-container">
      <h2>Todo List</h2>
      <div className="add-todo">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new todo"
        />
        <button onClick={addTodo}>Add</button>
        <button onClick={deleteAllChoose}>Delete All Choose</button>
      </div>
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id, false)}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
              <button onClick={() => addTodoDone(todo.id)}>Done</button>
              <button onClick={() => updateTodo(todo.id)}>Update</button>
              <button onClick={() => deleteTodo(todo.id, false)}>Delete</button>
          </li>
        ))}
      </ul>

      <div className='done'>
        <h2>Done</h2>
        <ul className="todo-list">
        {todoDones.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id, true)}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>             
              <button onClick={() => deleteTodo(todo.id, true)}>Delete</button>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};