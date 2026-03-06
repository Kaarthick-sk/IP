const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    skills: {
        type: [String],
        default: []
    },
    experience: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    availability: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
