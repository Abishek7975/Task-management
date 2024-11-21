import { Heading } from "../components/heading";
import { SubHeading } from "../components/subheading";
import { Button } from "../components/button";
import { InputBox } from "../components/inputbox";
import { BottomWarning } from "../components/bottomWarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signin = function(){
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Signin"}></Heading>
                <SubHeading label={"Signin to use Task Manager"}></SubHeading>
                <InputBox onChange={function(event){return setEmail(event.target.value)}} placeholder={"Email"} />
                <InputBox onChange={function(event){return setPassword(event.target.value)}} placeholder={"Password"}/>
                <Button onClick={async ()=>{
                    const response =await axios.post("http://localhost:3000/api/v1/user/signin",{
                        email,
                        password
                    })
                    localStorage.setItem("authToken",response.data.token)
                    navigate("/dashboard")
                    
                }} label={"Signin"}></Button>
                <BottomWarning label={"Not signed up yet?"} link={"Signin"} to={"/signup"}></BottomWarning>

        </div>
        </div>
        </div>
}