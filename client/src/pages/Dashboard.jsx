import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const Dashboard = () => {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchMyProjects();
    }, []);

    const fetchMyProjects = async () => {
        try {
            const { data } = await API.get('/projects/my-projects');
            setProjects(data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h2>My Projects Dashboard</h2>
            <table border="1" cellPadding="10" style={{ width: '100%', marginTop: '1rem' }}>
                <thead>
                    <tr>
                        <th>Project Name</th>
                        <th>Company</th>
                        <th>Status</th>
                        <th>Completion Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map(p => (
                        <tr key={p._id}>
                            <td>{p.project}</td>
                            <td>{p.company}</td>
                            <td>{p.status}</td>
                            <td>{p.completion_date ? new Date(p.completion_date).toLocaleDateString() : 'N/A'}</td>
                            <td>
                                <button onClick={() => navigate(`/project/${p._id}`)}>View Details</button>
                            </td>
                        </tr>
                    ))}
                    {projects.length === 0 && <tr><td colSpan="5">No projects assigned currently.</td></tr>}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
