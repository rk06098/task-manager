import React, { useState, useEffect } from 'react';

export default function TaskForm({ token, fetchTasks, currentTask, setCurrentTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (currentTask) {
      setTitle(currentTask.title);
      setDescription(currentTask.description);
    } else {
      setTitle('');
      setDescription('');
    }
  }, [currentTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return alert('Task title is required');

    const url = currentTask ? `https://task-manager-zvzw.onrender.com/api/tasks/${currentTask._id}` : 'https://task-manager-zvzw.onrender.com/api/tasks';
    const method = currentTask ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ title, description }),
    });

    if (res.ok) {
      setTitle('');
      setDescription('');
      setCurrentTask(null);
      fetchTasks();
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '25px', padding: '20px', border: '1px solid #eee', borderRadius: '6px', background: '#fafafa' }}>
      <h3 style={{ margin: '0 0 10px 0' }}>{currentTask ? 'Edit Task' : 'Create a New Task'}</h3>
      <input type="text" placeholder="What needs to be done?" value={title} onChange={(e) => setTitle(e.target.value)} style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
      <textarea placeholder="Task details/description (optional)" value={description} onChange={(e) => setDescription(e.target.value)} style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', minHeight: '60px', resize: 'vertical' }} />
      <div style={{ display: 'flex', gap: '10px' }}>
        <button type="submit" style={{ flex: 1, padding: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          {currentTask ? 'Save Changes' : 'Add Task'}
        </button>
        {currentTask && (
          <button type="button" onClick={() => setCurrentTask(null)} style={{ padding: '10px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
        )}
      </div>
    </form>
  );
}