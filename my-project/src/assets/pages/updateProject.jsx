import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { InputBox } from "../components/inputbox";
import { Button } from "../components/button";
import axios from "axios";
import { Appbar } from "../components/appbar";

export const UpdateProject = function () {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/v1/getProjects`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("authToken"),
                },
            })
            .then((response) => {
                const project = response.data.projects.find(
                    (project) => project._id === projectId
                );
                if (project) {
                    setName(project.name);
                    setDescription(project.description);
                }
            });
    }, [projectId]);

    const handleUpdate = () => {
        axios
            .post(
                `http://localhost:3000/api/v1/updateProject/${projectId}`,
                { name, description },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("authToken"),
                    },
                }
            )
            .then(() => {
                navigate("/dashboard");
            })
            .catch((error) => {
                console.error("Error updating project:", error.message);
            });
    };

    return <>

            <Appbar/>
     <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
            <h1>Update Project</h1>
            <InputBox
                placeholder="Project Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <InputBox
                placeholder="Project Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <Button label="Update" onClick={handleUpdate} />
        </div>
        </div>
        </div>
    </>
};
