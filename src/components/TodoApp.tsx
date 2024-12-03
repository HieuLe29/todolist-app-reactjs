import { useState } from 'react';
import { UpdateUser } from './UpdateTodo';

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}



const TodoApp = () => {
  const [todos, setTodos] = useState<TodoItem[]>([
    {
      id: '1',
      text: 'Learn React',
      completed: false,
    },
    {
      id: '2',
      text: 'Learn TypeScript',
      completed: false,
    },
    {
      id: '3',
      text: 'Learn NodeJS',
      completed: false,
    },
  ]);
  const [newTodo, setNewTodo] = useState('');

  const [todoDones, setTodoDones] = useState<TodoItem[]>([
    {
      id: '4',
      text: 'Learn Redux',
      completed: true,
    },
    {
      id: '5',
      text: 'Learn Context API',
      completed: true,
    },
    {
      id: '6',
      text: 'Learn React Query',
      completed: true,
    },
  ]);


  const addTodo = () => {
    if (newTodo !== '') {
      const newId = crypto.randomUUID();
      const checkRepeat = todos.find((todo) => todo.text === newTodo);
      if (checkRepeat) {
        alert('Todo already exists');
        return;
      };
      const newTodoItem: TodoItem = {
        id: newId,
        text: newTodo,
        completed: false,
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo('');
    }
  };

  const addTodoDone = (id: string) => {
    const todoDone = todos.find((todo) => todo.id === id);
    if (todoDone) {
      const newId = crypto.randomUUID();
      const newTodoDone: TodoItem = {
        id: newId,
        text: todoDone.text,
        completed: false,
      };
      setTodoDones([...todoDones, newTodoDone]);
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  }


  const updateTodo = (id: string) => {
    
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
      }
    }
  };

  const removeTodo = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const deleteAllChoose = () => {
    const updatedTodos = todos.filter((todo) => !todo.completed);
    const updatedTodoDones = todoDones.filter((todo) => !todo.completed);
    setTodos(updatedTodos);
    setTodoDones(updatedTodoDones);
  }

  const toggleComplete = (id: string, status: boolean) => {
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

  return (
    <div className=''>
      <h1>Todo App</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add Todo</button>
      <button onClick={deleteAllChoose}>Delete All Choose</button>
      <div className='doing'>
        <h2>Doing</h2>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id, false)}
              />
              <span>
                {todo.text}
              </span>
              <button onClick={() => addTodoDone(todo.id)}>Done</button>
              <button onClick={() => removeTodo(todo.id)}>Remove</button>
              <button onClick={() => updateTodo(todo.id)}>Update</button>
            </li>
          ))}
        </ul>
      </div>
      <div className='done'>
        <h2>Done</h2>
        <ul>
          {todoDones.map((todo) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id, true)}
              />
              <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                {todo.text}
              </span>
              <button onClick={() => removeTodo(todo.id)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoApp;