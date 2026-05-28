import React, { useState, useEffect, useCallback } from 'react';
import TaskForm from '../components/TaskForm';

export default function Dashboard({ token, logout, user }) {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [currentTask, setCurrentTask] = useState(null);

  const fetchTasks = useCallback(async () => {
    try {
      const res = await fetch('https://task-manager-zvzw.onrender.com/api/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setTasks(data);
    } catch (err) {
      console.error('Error fetching tasks');
    }
  }, [token]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const toggleStatus = async (task) => {
    await fetch(`https://task-manager-zvzw.onrender.com/api/tasks/${task._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status: task.status === 'Pending' ? 'Completed' : 'Pending' }),
    });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    if (window.confirm('Delete this task?')) {
      await fetch(`https://task-manager-zvzw.onrender.com/api/tasks/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    }
  };

  const filteredTasks = tasks.filter(task => filter === 'All' || task.status === filter);

  return (
    <div style={{ width: '100%', maxWidth: '700px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ margin: 0 }}>Hello, {user?.name || 'User'} 👋</h2>
        <button onClick={logout} style={{ padding: '8px 16px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Logout</button>
      </div>

      <TaskForm token={token} fetchTasks={fetchTasks} currentTask={currentTask} setCurrentTask={setCurrentTask} />

      <div style={{ marginBottom: '20px', display: 'flex', gap: '8px' }}>
        {['All', 'Pending', 'Completed'].map(type => (
          <button key={type} onClick={() => setFilter(type)} style={{ flex: 1, padding: '10px', background: filter === type ? '#007bff' : '#fff', color: filter === type ? '#fff' : '#333', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            {type} Tasks
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredTasks.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#777', marginTop: '20px' }}>No tasks found in this section.</p>
        ) : (
          filteredTasks.map(task => (
            <div key={task._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', border: '1px solid #eee', borderRadius: '6px', background: task.status === 'Completed' ? '#e2f0d9' : '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
              <div style={{ flex: 1, marginRight: '15px' }}>
                <h4 style={{ margin: '0 0 5px 0', textDecoration: task.status === 'Completed' ? 'line-through' : 'none', color: task.status === 'Completed' ? '#555' : '#000' }}>{task.title}</h4>
                <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>{task.description || 'No description provided'}</p>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => toggleStatus(task)} style={{ padding: '6px 12px', cursor: 'pointer' }}>{task.status === 'Pending' ? 'Complete' : 'Undo'}</button>
                <button onClick={() => setCurrentTask(task)} style={{ padding: '6px 12px', background: '#ffc107', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
                <button onClick={() => deleteTask(task._id)} style={{ padding: '6px 12px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}