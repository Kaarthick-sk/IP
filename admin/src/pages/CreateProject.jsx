import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const CreateProject = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        client_company: '',
        project_name: '',
        prob_statement: '',
        deadline: '',
        period_alloted: 0,
        required_skills: '',
        team_lead: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                required_skills: formData.required_skills.split(',').map(s => s.trim())
            };
            await API.post('/projects', payload);
            alert('Project created! Placeholder RAG integration called backend-side.');
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            alert('Error creating project');
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Create New Project</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '400px', gap: '1rem' }}>
                <input name="client_company" placeholder="Client Company" onChange={handleChange} required />
                <input name="project_name" placeholder="Project Name" onChange={handleChange} required />
                <textarea name="prob_statement" placeholder="Problem Statement" onChange={handleChange} required />
                <input name="deadline" type="date" placeholder="Deadline" onChange={handleChange} required />
                <input name="period_alloted" type="number" placeholder="Period Allotted (days)" onChange={handleChange} required />
                <input name="required_skills" placeholder="Required Skills (comma separated)" onChange={handleChange} required />

                <fieldset style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <legend>Team Lead Details</legend>
                    <input name="team_lead" placeholder="TL Username" onChange={handleChange} required />
                    <input name="password" type="password" placeholder="TL Password" onChange={handleChange} required />
                </fieldset>

                <button type="submit">Create Project</button>
            </form>
        </div>
    );
};

export default CreateProject;
