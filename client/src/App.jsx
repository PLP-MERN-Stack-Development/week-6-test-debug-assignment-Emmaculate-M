import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [bugs, setBugs] = useState([]);
  const [form, setForm] = useState({ title: '', description: '' });

  const fetchBugs = async () => {
    const res = await axios.get('http://localhost:5000/api/bugs');
    setBugs(res.data);
  };

  useEffect(() => {
    fetchBugs();
  }, []);

  const updateStatus = async (id, status) => {
    await axios.put(`http://localhost:5000/api/bugs/${id}`, { status });
    fetchBugs();
  };

  const deleteBug = async (id) => {
    await axios.delete(`http://localhost:5000/api/bugs/${id}`);
    fetchBugs();
  };

  const buttonStyle = {
    padding: '6px 12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  };

  const statusColors = {
    open: '#f0ad4e',         // orange
    'in-progress': '#0275d8', // blue
    resolved: '#5cb85c',      // green
  };

  return (
    <div
      style={{
        maxWidth: '700px',
        margin: '40px auto',
        padding: '0 20px',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: '#333',
      }}
    >
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Bug Tracker</h1>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await axios.post('http://localhost:5000/api/bugs', form);
          setForm({ title: '', description: '' });
          fetchBugs();
        }}
        style={{
          display: 'flex',
          gap: '10px',
          alignItems: 'flex-start',
          marginBottom: '30px',
        }}
      >
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Title"
          required
          style={{
            flex: '1 1 150px',
            padding: '8px',
            fontSize: '1rem',
            borderRadius: '5px',
            border: '1px solid #ccc',
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
          }}
        />
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Description"
          style={{
            flex: '2 1 300px',
            padding: '8px',
            resize: 'vertical',
            fontSize: '1rem',
            borderRadius: '5px',
            border: '1px solid #ccc',
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
          }}
        />
        <button
          type="submit"
          style={{
            ...buttonStyle,
            backgroundColor: '#28a745',
            color: 'white',
            alignSelf: 'center',
          }}
        >
          Report Bug
        </button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {bugs.map((bug) => (
          <li
            key={bug._id}
            style={{
              marginBottom: '1.5rem',
              padding: '15px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
            }}
          >
            <h3 style={{ marginBottom: '6px' }}>
              {bug.title}{' '}
              <span
                style={{
                  fontStyle: 'normal',
                  fontWeight: 'bold',
                  color: 'white',
                  backgroundColor: statusColors[bug.status] || '#6c757d',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '0.85rem',
                  marginLeft: '10px',
                }}
              >
                {bug.status}
              </span>
            </h3>
            <p style={{ marginBottom: '10px', whiteSpace: 'pre-wrap' }}>{bug.description}</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => updateStatus(bug._id, 'in-progress')}
                style={{ ...buttonStyle, backgroundColor: '#0275d8', color: 'white' }}
              >
                In Progress
              </button>
              <button
                onClick={() => updateStatus(bug._id, 'resolved')}
                style={{ ...buttonStyle, backgroundColor: '#5cb85c', color: 'white' }}
              >
                Resolved
              </button>
              <button
                onClick={() => deleteBug(bug._id)}
                style={{ ...buttonStyle, backgroundColor: '#dc3545', color: 'white' }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
