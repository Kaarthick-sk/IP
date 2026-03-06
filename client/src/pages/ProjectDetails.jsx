import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API, { RAG_API } from '../services/api';

const ProjectDetails = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [query, setQuery] = useState('');
    const [ragResponses, setRagResponses] = useState([]);

    useEffect(() => {
        fetchProject();
    }, [id]);

    const fetchProject = async () => {
        try {
            const { data } = await API.get('/projects/my-projects');
            const prj = data.find(p => p._id === id);
            setProject(prj);
        } catch (err) {
            console.error(err);
        }
    };

    const handleRagQuery = async (e) => {
        e.preventDefault();
        if (!query) return;

        try {
            const { data } = await RAG_API.post('/rag/analyze-project', {
                project_data: project,
                query: query
            });
            setRagResponses([...ragResponses, { q: query, a: data.analysis }]);
            setQuery('');
        } catch (err) {
            console.error(err);
            alert('Failed to connect to RAG service');
        }
    };

    if (!project) return <div style={{ padding: '2rem' }}>Loading project...</div>;

    return (
        <div style={{ padding: '2rem', display: 'flex', gap: '2rem' }}>
            <div style={{ flex: 1 }}>
                <h2>Project: {project.project}</h2>
                <p><strong>Company:</strong> {project.company}</p>
                <p><strong>Status:</strong> {project.status}</p>
                <p><strong>Deadline:</strong> {project.completion_date ? new Date(project.completion_date).toLocaleDateString() : 'N/A'}</p>
                <p><strong>Problem Statement:</strong></p>
                <p style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px' }}>
                    {project.prob_statement}
                </p>
                <p><strong>Period Allotted:</strong> {project.period_alloted} days</p>
            </div>

            <div style={{ flex: 1, borderLeft: '1px solid #ccc', paddingLeft: '2rem' }}>
                <h3>RAG Assistant</h3>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>Example queries: analyze risks, suggest improvements, explain project scope</p>

                <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '1rem', border: '1px solid #eee', padding: '1rem' }}>
                    {ragResponses.map((item, i) => (
                        <div key={i} style={{ marginBottom: '1rem' }}>
                            <p><strong>You:</strong> {item.q}</p>
                            <p style={{ background: '#e3f2fd', padding: '0.5rem', borderRadius: '4px' }}><strong>AI:</strong> {item.a}</p>
                        </div>
                    ))}
                    {ragResponses.length === 0 && <p>No queries yet.</p>}
                </div>

                <form onSubmit={handleRagQuery} style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                        style={{ flex: 1 }}
                        type="text"
                        placeholder="Ask RAG assistant..."
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />
                    <button type="submit">Ask</button>
                </form>
            </div>
        </div>
    );
};

export default ProjectDetails;
