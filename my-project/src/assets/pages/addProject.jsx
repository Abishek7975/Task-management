import { InputBox } from "../components/inputbox";
import { Heading } from "../components/heading";
import { SubHeading } from "../components/subheading";
import { Button } from "../components/button";
import { useState } from "react";
import { Appbar } from "../components/appbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const AddProject = function(){
    const [name,setName] = useState("")
    const [description, setDescription] = useState("")
    const navigate = useNavigate();
    return <>
    <Appbar/>
     <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
            <Heading label={"Add Project"}/>
            <SubHeading label={"Add a new project to your database"}/>
            <InputBox onChange={(event)=> {setName(event.target.value)}} placeholder={"Project name"}/>
            <InputBox onChange={(event)=> {setDescription(event.target.value)}} placeholder={"Project description"}/>
            <Button onClick={async()=>{
                await axios.post("http://localhost:3000/api/v1/newProject", {
                    name,
                    description
                },{
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("authToken")
                    }
                })
                navigate("/dashboard")
            }} label={"Submit"}/>
        </div>
    </div>
    </div>
    </>
}