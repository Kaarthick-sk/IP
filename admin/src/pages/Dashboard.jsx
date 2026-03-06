import React, { useEffect, useState } from 'react';
import API from '../services/api';

const Dashboard = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const { data } = await API.get('/projects');
            setProjects(data);
        } catch (err) {
            console.error(err);
        }
    };

    const deleteProject = async (id) => {
        if (window.confirm('Delete project?')) {
            try {
                await API.delete(`/projects/${id}`);
                fetchProjects();
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Admin Dashboard - Projects</h2>
            <table border="1" cellPadding="10" style={{ width: '100%', marginTop: '1rem' }}>
                <thead>
                    <tr>
                        <th>Project Name</th>
                        <th>Company</th>
                        <th>Team Lead</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map(p => (
                        <tr key={p._id}>
                            <td>{p.project}</td>
                            <td>{p.company}</td>
                            <td>{p.tl?.username || 'N/A'}</td>
                            <td>{p.status}</td>
                            <td>
                                <button onClick={() => alert('View details implementation placeholder')}>View</button>{' '}
                                <button onClick={() => alert('Edit project implementation placeholder')}>Edit</button>{' '}
                                <button onClick={() => deleteProject(p._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    {projects.length === 0 && <tr><td colSpan="5">No projects found.</td></tr>}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
