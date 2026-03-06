import React, { useEffect, useState } from 'react';
import API from '../services/api';

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [formData, setFormData] = useState({ name: '', email: '', experience: 0, role: '', skills: '' });

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const { data } = await API.get('/employees');
            setEmployees(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const addEmployee = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                skills: formData.skills.split(',').map(s => s.trim())
            };
            await API.post('/employees', payload);
            fetchEmployees();
            setFormData({ name: '', email: '', experience: 0, role: '', skills: '' });
        } catch (err) {
            console.error(err);
        }
    };

    const deleteEmployee = async (id) => {
        if (window.confirm('Delete employee?')) {
            try {
                await API.delete(`/employees/${id}`);
                fetchEmployees();
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Employees</h2>
            <form onSubmit={addEmployee} style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input name="experience" type="number" placeholder="Experience" value={formData.experience} onChange={handleChange} required />
                <input name="role" placeholder="Role" value={formData.role} onChange={handleChange} required />
                <input name="skills" placeholder="Skills (comma separated)" value={formData.skills} onChange={handleChange} />
                <button type="submit">Add Employee</button>
            </form>

            <table border="1" cellPadding="10" style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Experience</th>
                        <th>Skills</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(e => (
                        <tr key={e._id}>
                            <td>{e.name}</td>
                            <td>{e.email}</td>
                            <td>{e.role}</td>
                            <td>{e.experience}</td>
                            <td>{e.skills.join(', ')}</td>
                            <td>
                                <button onClick={() => deleteEmployee(e._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    {employees.length === 0 && <tr><td colSpan="6">No employees found.</td></tr>}
                </tbody>
            </table>
        </div>
    );
};

export default Employees;
