import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState('');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const res = await axios.get('http://localhost:5000/todos');
        setTodos(res.data);
    };

    const addTodo = async () => {
        if (!task) return;
        const res = await axios.post('http://localhost:5000/todos', { task });
        setTodos([...todos, res.data]);
        setTask('');
    };

    const deleteTodo = async (id) => {
        await axios.delete(`http://localhost:5000/todos/${id}`);
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const toggleComplete = async (todo) => {
        const updatedTodo = { ...todo, completed: !todo.completed };
        await axios.put(`http://localhost:5000/todos/${todo.id}`, updatedTodo);
        setTodos(todos.map(t => (t.id === todo.id ? updatedTodo : t)));
    };

    return (
        <div>
            <h1>To-Do List</h1>
            <input 
                type="text" 
                value={task} 
                onChange={(e) => setTask(e.target.value)} 
                placeholder="Add a new task"
            />
            <button onClick={addTodo}>Add</button>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        <span 
                            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }} 
                            onClick={() => toggleComplete(todo)}
                        >
                            {todo.task}
                        </span>
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
