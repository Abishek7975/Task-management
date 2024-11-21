const express = require("express")
const {User, Project, Task} = require("../Database/database")
const jwt = require("jsonwebtoken")
const zod = require("zod")
const Middleware = require("./middleware")

const router = express.Router();
const JWT_PASSWORD = "purvanchal";

router.post("/newProject",Middleware,async function(req,res){
    try{

        const {name, description} = req.body;

        const project = new Project({
            name: name,
            description, description,
            owner: req.user_id
        });

        await project.save();
        res.status(201).json(project);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
      }

})

router.get("/getProjects",Middleware, async function(req,res){
    try{
        const projects = await Project.find({owner: req.user_id}).sort({createdAt: -1});
        res.json({projects});

    }
    catch(error){
        res.status(500).json({"message": error.message})
    }
})

router.get("/:id/getTasks",Middleware, async function(req,res){
    try{
        const project = await Project.findOne({_id: req.params.id});
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
          }
      
        const tasks = await Task.find({project: project._id});
        res.status(200).json({"tasks": tasks})
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.post("/updateProject/:id",Middleware, async function(req,res) {
    try{
        const {name, description} = req.body;
        const project = await Project.findOneAndUpdate(
            {_id: req.params.id,owner: req.user_id},
            {name,description,updatedAt: Date.now()}
        )
    if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
      
      res.json(project);
    }
     catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
);

router.post("/deleteProject/:id",Middleware, async function (req,res) {
    try{
        const project = await Project.findOneAndDelete({_id: req.params.id, owner: req.user_id});

        if(!project){
            res.status(404).json({"message": "Project not found"})
        }

        await Task.deleteMany({project: req.params.id});

        res.json({ message: 'Project deleted successfully' });
    } 
    catch (error) {
      res.status(500).json({ message: error.message });
    }
});

router.post("/:id/newTask",Middleware, async function (req,res) {
    try{
        const {title, description, status, priority, dueDate} = req.body;
        console.log(req.params.id);

        const projectExists = await Project.findOne({
            _id: req.params.id,
            owner: req.user_id
          });
          
          if (!projectExists) {
            return res.status(404).json({ message: 'Project not found' });
          }

        const task = new Task({
            title,
            description,
            status,
            priority,
            dueDate,
            project: req.params.id,
            creator: req.user_id
        })

        await task.save();
        res.status(201).json(task);
    } 
    catch (error) {
      res.status(400).json({ message: error.message });
    }
});

router.post("/updateTask/:taskId",Middleware, async (req,res) => {
    try{
        const { title, description, status, priority, dueDate } = req.body;

        const task = Task.findOneAndUpdate({_id: req.params.taskId, creator: req.user_id},{
            title,
            description,
            status,
            priority,
            dueDate
        });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
          }
          
          res.json(task);
        } 
        catch (error) {
          res.status(400).json({ message: error.message });
        }
});

router.post("/updateTaskStatus/:taskId",Middleware, async function (req,res) {
    try{
        const {status} = req.body;
        const task = await Task.findOneAndUpdate({_id: req.params.taskId},{
            status: status
        })

        if(!task){
            res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } 
    catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

router.post("/deleteTask/:taskId",Middleware, async function (req,res) {
    try{
        console.log("hi")
        const task = await Task.findOneAndDelete({_id: req.params.taskId});
        console.log(task)

        if(!task){
            return res.status(404).json({"message": "Task not found"})
        }
        res.status(200).json({"message": "Task deleted successfully"})
    }

    catch(error){
        res.status(500).json({"message": error.message})
    }
})

module.exports = router;



