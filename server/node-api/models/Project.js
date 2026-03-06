const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    project: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    tl: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    }],
    assigned_date: {
        type: Date,
        default: Date.now
    },
    period_alloted: {
        type: Number, // Assuming in days
        required: true
    },
    completion_date: {
        type: Date
    },
    prob_statement: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Active', 'Completed', 'On Hold'],
        default: 'Active'
    }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
