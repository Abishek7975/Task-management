import { InputBox } from "../components/inputbox";
import { Heading } from "../components/heading";
import { SubHeading } from "../components/subheading";
import { Button } from "../components/button";
import { useState } from "react";
import { Appbar } from "../components/appbar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";


export const AddTasks = function(){
    const [title,setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [status,setStatus] = useState("")
    const[priority,setPriority] = useState("")
    const [dueDate, setDueDate] = useState("")
    const { projectId }  = useParams();
    const navigate = useNavigate();

    return <>
      <Appbar />
      <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
          <div className="rounded-lg bg-white w-96 text-center p-4 shadow-lg">
            <Heading label={"Add Task"} />
            <SubHeading label={"Add a new task to your project"} />
            
            {/* Task Name */}
            <InputBox
              placeholder={"Task Name"}
              onChange={(event) => setTitle(event.target.value)}
            />
            
            {/* Task Description */}
            <InputBox
              placeholder="Task Description"
              onChange={(event) => setDescription(event.target.value)}
            ></InputBox>
            
            {/* Task Priority */}
            <span><h2>Priority</h2></span>
            <select
              className="w-full border rounded-md p-2 mt-4"
              value={priority}
              onChange={(event) => setPriority(event.target.value)}
            >
              <option value="low">High</option>
              <option value="medium">Medium</option>
              <option value="high">Low</option>
            </select>
            
            {/* Task Status */}
            <h2>Status</h2>
            <select
              className="w-full border rounded-md p-2 mt-4"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option value="todo">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="review">Review</option>
              <option value="done">Completed</option>
            </select>
            
            {/* Due Date */}
            <input
              type="date"
              className="w-full border rounded-md p-2 mt-4"
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
            />
            
            {/* Submit Button */}
            <Button label="Add Task" onClick={async()=>{
              await axios.post(`http://localhost:3000/api/v1/${projectId}/newTask`,{
                  title,
                  description,
                  priority,
                  status,
                  dueDate
              },
              {
                headers: {
                  "Authorization": "Bearer " + localStorage.getItem("authToken")
                },
              },
              alert("Task added successfully"),
              navigate(`/dashboard/${projectId}/tasks`)
                
              )
            }} />
          </div>
        </div>
      </div>
    </>
};
