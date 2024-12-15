import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/tasks/';

// Helper function to get the Authorization headers
const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    console.log('Authorization Token:', token); // Debugging the token
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// Fetch tasks
export const getTasks = async () => {
    try {
        const response = await axios.get(API_URL, { headers: getAuthHeaders() });
        console.log('Fetched tasks:', response.data); // Debug success
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks:', error.response || error.message);
        throw error;
    }
};

// Add a new task
export const addTask = async (task) => {
    try {
        const headers = getAuthHeaders();
        console.log('Add Task Headers:', headers); // Debug headers
        const response = await axios.post(API_URL, task, { headers });
        console.log('Task added successfully:', response.data); // Debug success
        return response.data;
    } catch (error) {
        console.error('Error adding task:', error.response || error.message);
        throw error;
    }
};

// Delete a task
export const deleteTask = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}${id}/`, { headers: getAuthHeaders() });
        console.log(`Task ${id} deleted successfully.`);
        return response.data;
    } catch (error) {
        console.error('Error deleting task:', error.response || error.message);
        throw error;
    }
};

// Update a task
export const updateTask = async (id, updatedTask) => {
    try {
        const response = await axios.put(`${API_URL}${id}/`, updatedTask, {
            headers: getAuthHeaders(),
        });
        console.log(`Task ${id} updated successfully:`, response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating task:', error.response || error.message);
        throw error;
    }
};
