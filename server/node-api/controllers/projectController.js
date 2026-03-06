const Project = require('../models/Project');
const User = require('../models/User');

// GET /api/projects
const getProjects = async (req, res) => {
    try {
        const projects = await Project.find({}).populate('tl', 'username').populate('members', 'name');
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// GET /api/projects/my-projects
const getMyProjects = async (req, res) => {
    try {
        const projects = await Project.find({ tl: req.user._id }).populate('tl', 'username').populate('members', 'name');
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// POST /api/projects
const createProject = async (req, res) => {
    try {
        const { client_company, project_name, prob_statement, deadline, period_alloted, required_skills, team_lead, password } = req.body;

        // 1. Create TLS user account if not existing
        let tlUser = await User.findOne({ username: team_lead });
        if (!tlUser) {
            tlUser = await User.create({
                username: team_lead,
                password: password, // As requested, storing plain for this exercise
                role: 'tl'
            });
        }

        // 2. Call RAG placeholder endpoint to recommend members
        let recommended_members = [];
        try {
            // Typically we'd use axios or fetch here pointing to process.env.RAG_SERVER/rag/select-members
            const ragResponse = await fetch(`${process.env.RAG_SERVER}/rag/select-members`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ skills_required: required_skills, project_requirements: prob_statement })
            });
            const data = await ragResponse.json();
            recommended_members = data.recommended_members || [];
        } catch (err) {
            console.error('Error reaching RAG server, proceeding with empty list:', err.message);
        }

        // Depending on logic, let's say we find employee ObjectIds or just store recommendations as temp strings? 
        // The model expects ObjectIds. For now, since RAG returns dummy strings ["emp1", "emp2"], 
        // we'll just leave members empty or handle it on front-end. We'll leave it empty to avoid ObjectId cast errors.

        // 3. Store project in database
        const project = new Project({
            project: project_name,
            company: client_company,
            tl: tlUser._id,
            prob_statement,
            completion_date: deadline,
            period_alloted,
            members: [] // Placeholder for actual employees
        });

        const createdProject = await project.save();
        res.status(201).json(createdProject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// PUT /api/projects/:id
const updateProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (project) {
            res.json(project);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE /api/projects/:id
const deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (project) {
            res.json({ message: 'Project removed' });
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getProjects,
    getMyProjects,
    createProject,
    updateProject,
    deleteProject
};
