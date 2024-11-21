const express = require("express")
const {User, Project, Task} = require("../Database/database")
const jwt = require("jsonwebtoken")
const zod = require("zod");

const router = express.Router();

const JWT_PASSWORD = "purvanchal"

signUpSchema = zod.object({
    email: zod.string(),
    password: zod.string().min(6),
    name: zod.string()
});

router.post("/signup",async function(req,res){
    const userData = await signUpSchema.safeParse(req.body);

    if(!userData.success){
        res.status(400).json({"msg": "Invalid Input"})
        return
    }

    const user = await User.create({
        email: userData.data.email,
        password: userData.data.password,
        name: userData.data.name
    })

    const token = jwt.sign({user_id : user._id}, JWT_PASSWORD);

    res.status(200).json({
        "msg": "User created successfully",
        "token": token
    })


})

const signInSchema = zod.object({
    email: zod.string(),
    password: zod.string()
})

router.post("/signin",async function(req,res){
    const userData = signInSchema.safeParse(req.body);

    if(!userData.success){
        res.status(400).json({"msg": "Invalid Input"})
        return
    }

    const user = await User.findOne({
        email: userData.data.email,
        password: userData.data.password
      });
    
      if (!user) {
        return res.status(404).json({ message: "Invalid email or password" });
      }
    
      const token = jwt.sign({ user_id: user._id }, JWT_PASSWORD);
    
      res.status(200).json({
        message: "Signed in successfully",
        token: token,
      });
});

module.exports = router;

