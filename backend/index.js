const express = require("express")
const cors = require("cors")

const projectRouter = require("./routes/project")
const userRouter = require("./routes/user")

const app = express();
app.use(express.json())
app.use(cors());

const corsOptions = {
  origin: "http://localhost:5173", // Frontend URL
  optionsSuccessStatus: 200, // Some legacy browsers (IE11) choke on 204
};

app.use(cors(corsOptions));



app.use("/api/v1",projectRouter);
app.use("/api/v1/user",userRouter);

app.listen(3000, () => {
    console.log("Server running on port 3000");
  });