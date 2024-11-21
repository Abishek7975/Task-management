const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://abhishekmongo:AbishekMongo@cluster0.y4xm7.mongodb.net/taskmanagement")

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    }
})

const User = mongoose.model("User",UserSchema)

const ProjectSchema = new mongoose.Schema({
    name :{
        type: String,
        required: true,
        trim: true
    },

    description: String,

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: Date.now
    }
})

const Project = mongoose.model("Project",ProjectSchema)

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: String,

    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },
    status: {
        type: String,
        enum: ['todo', 'in-progress', 'review', 'done'],
        default: 'todo'

    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
      },

    creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
    },
    dueDate: Date,

})

const Task = mongoose.model("Task",TaskSchema)

module.exports = {
    User,Project,Task
};