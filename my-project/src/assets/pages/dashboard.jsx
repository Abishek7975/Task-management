import { useEffect, useState } from "react";
import { Appbar } from "../components/appbar";
import { Card } from "../components/card";
import { Button } from "../components/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Dashboard = function(){
    const [projects,setProjects] = useState([])
    const navigate = useNavigate();

    useEffect(()=>{
        axios
            .get("http://localhost:3000/api/v1/getProjects",
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("authToken")
                }
            })
            .then(function(response){
                setProjects(response.data.projects)
            })
            .catch((error) => {
                console.error("Error fetching projects:", error.message);
              });
}, []);

    return <div>
        <div className="p-16">
        <Appbar/>
        <div>
            <Button label={"Add Project"} onClick={()=>{navigate("/dashboard/addProject")}}></Button>
        <div className="flex flex-wrap gap-4 mt-8 p-8">
            {projects.map(function(project){
                return <Card onClick={() => navigate(`/dashboard/${project._id}/tasks`)} updateOnClick={()=> {navigate(`/dashboard/updateProject/${project._id}`)}} deleteOnClick={
                    async()=> {
                    await axios.post(`http://localhost:3000/api/v1/deleteProject/${project._id}`,
                        {},
                        {
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("authToken")
                        }

                    })
                    alert("Item deleted successfully!")
                    setProjects((prevProjects)=>{prevProjects.filter(function(proj){
                        return proj._id !== project._id
                    })
                    })
                    navigate("/dashboard")
                }} key={project._id} heading={project.name} subheading={project.description} buttonText={"Add/Edit tasks"} ></Card>
            })}
        </div>
        </div>
        </div>
        </div>
}