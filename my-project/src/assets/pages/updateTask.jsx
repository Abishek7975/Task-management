import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { InputBox } from "../components/inputbox";
import { Button } from "../components/button";
import { Appbar } from "../components/appbar";
import axios from "axios";

export const UpdateTask = function () {
    const { taskId } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("");
    const [status, setStatus] = useState("");
    const [dueDate, setDueDate] = useState("");

    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/v1/task/${taskId}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("authToken"),
                },
            })
            .then((response) => {
                const task = response.data;
                setTitle(task.title);
                setDescription(task.description);
                setPriority(task.priority);
                setStatus(task.status);
                setDueDate(task.dueDate.split("T")[0]); // Format for date input
            });
    }, [taskId]);

    const handleUpdate = () => {
        axios
            .post(
                `http://localhost:3000/api/v1/updateTask/${taskId}`,
                { title, description, priority, status, dueDate },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("authToken"),
                    },
                }
            )
            .then(() => {
                navigate(`/tasks/${task.project}`);
            })
            .catch((error) => {
                console.error("Error updating task:", error.message);
            });
    };

    return <>
    <Appbar/>
     <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
            <h1>Update Task</h1>
            <InputBox
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <InputBox
                placeholder="Task Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <InputBox
                placeholder="Priority: Low/Medium/High"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
            />
            <InputBox
                placeholder="Status: todo/in-progress/review/completed"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            />
            <InputBox
                type="date"
                placeholder="Due Date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
            />
            <Button label="Update Task" onClick={handleUpdate} />
            </div>
        </div>
    </div>
</>
}
