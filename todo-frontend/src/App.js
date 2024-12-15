import React, { useEffect, useState, useCallback } from 'react';
import { getTasks, addTask, deleteTask, updateTask } from './services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import axios from 'axios';

function App() {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [filter, setFilter] = useState('All');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Handle Login
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/token/', {
                username,
                password,
            });
            const token = response.data.access;
            setToken(token);
            localStorage.setItem('token', token);
            toast.success('Login successful!');
        } catch (error) {
            console.error('Login error:', error.response?.data || error.message);
            toast.error('Invalid credentials. Please try again!');
        }
    };

    // Fetch tasks
    const fetchTasks = useCallback(async () => {
        if (!token) return;
        try {
            const fetchedTasks = await getTasks();
            setTasks(fetchedTasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            toast.error('Session expired. Please log in again.');
            handleLogout();
        }
    }, [token]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    // Add a task
    const handleAddTask = async () => {
        if (newTask.trim()) {
            try {
                const newTaskData = await addTask({
                    title: newTask,
                    description: '',
                    completed: false,
                });
                setTasks((prevTasks) => [...prevTasks, newTaskData]); // Update state directly
                setNewTask('');
                toast.success('Task added successfully!');
            } catch (error) {
                console.error('Error adding task:', error.response?.data || error.message);
                toast.error('Failed to add task.');
            }
        } else {
            toast.warning('Please enter a task name!');
        }
    };

    // Delete a task
    const handleDeleteTask = async (id) => {
        try {
            await deleteTask(id);
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
            toast.success('Task deleted!');
        } catch (error) {
            console.error('Error deleting task:', error.response?.data || error.message);
            toast.error('Failed to delete task.');
        }
    };

    // Toggle task completion
    const handleToggleCompletion = async (task) => {
        try {
            const updatedTask = await updateTask(task.id, {
                ...task,
                completed: !task.completed,
            });
            setTasks((prevTasks) =>
                prevTasks.map((t) => (t.id === task.id ? updatedTask : t))
            );
            toast.info('Task status updated!');
        } catch (error) {
            console.error('Error updating task:', error.response?.data || error.message);
            toast.error('Failed to update task.');
        }
    };

    // Logout
    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem('token');
        setTasks([]);
        toast.info('Logged out successfully!');
    };

    // Filtered tasks
    const filteredTasks = tasks.filter((task) => {
        if (filter === 'All') return true;
        return filter === 'Pending' ? !task.completed : task.completed;
    });

    // Login Screen
    if (!token) {
        return (
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Login</button>
                </form>
                <ToastContainer position="top-right" autoClose={3000} />
            </div>
        );
    }

    return (
        <div className="app-container">
            <h1>To-Do App</h1>
            <button onClick={handleLogout} className="logout-button">
                Logout
            </button>
            <div className="task-input">
                <input
                    type="text"
                    placeholder="New Task"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <button onClick={handleAddTask}>Add Task</button>
            </div>

            {/* Filter Buttons */}
            <div className="filters">
                <button onClick={() => setFilter('All')}>All</button>
                <button onClick={() => setFilter('Pending')}>Pending</button>
                <button onClick={() => setFilter('Completed')}>Completed</button>
            </div>

            {/* Task List */}
            <ul className="task-list">
                {filteredTasks.map((task) => (
                    <li key={task.id} className="task-item">
                        <span
                            className={task.completed ? 'completed' : ''}
                            onClick={() => handleToggleCompletion(task)}
                        >
                            {task.title} - {task.completed ? 'Done' : 'Pending'}
                        </span>
                        <button
                            className="delete"
                            onClick={() => handleDeleteTask(task.id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>

            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
}

export default App;
