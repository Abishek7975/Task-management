import { useEffect, useState } from "react"
import { Card } from "../components/card"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { TaskCard } from "../components/taskcard"
import { UpdateTask } from "./updateTask"
import { Button } from "../components/button"

export const Tasks = function(){
    const [tasks,setTasks] = useState([])
    const {projectId} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/v1/${projectId}/getTasks`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("authToken"),
                },
            })
            .then(function (response) {
                setTasks(response.data.tasks);
            })
            .catch((error) => {
                console.error("Error fetching tasks:", error.message);
            });
    }, [projectId]);

    return (
        <div className="p-8">
            <div className="flex flex-wrap pt-16 gap-6"> {/* Wrap all cards here */}
                <Button label={"Add Task"} onClick={()=> {navigate(`/dashboard/${projectId}/addTask`)}}></Button>
                {tasks.map(function (task) {
                    return (
                        <TaskCard
                            key={task._id} // Always include a unique key
                            title={task.title}
                            description={task.description}
                            status={task.status}
                            priority={task.priority}
                            dueDate={task.dueDate}
                            buttonText={"Edit project"}
                            updateOnClick={() => {
                                navigate(`/task/updateTask/${task._id}`);
                            }}
                            deleteOnClick={async () => {
                                try {
                                    await axios.post(
                                        `http://localhost:3000/api/v1/deleteTask/${task._id}`, // URL
                                        {}, 
                                        {
                                            headers: {
                                                Authorization: "Bearer " + localStorage.getItem("authToken"),
                                            },
                                        } 
                                    );
                                    alert("Task deleted successfully");
                                    setTasks((prevTasks)=>{prevTasks.filter(function(tsk){
                                        return tsk._id !== task._id
                                    })})
                                    navigate(`/dashboard/${projectId}/tasks`); // Refresh tasks after deletion
                                } catch (error) {
                                    console.error("Error deleting task:", error.message);
                                    alert("Failed to delete task. Please try again.");
                                }
                            }}
                            
                        />
                    );
                })}
            </div>
        </div>
    );
};