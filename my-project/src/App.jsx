import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { Signup } from './assets/pages/signup'
import { Signin } from './assets/pages/signin'
import { Dashboard } from './assets/pages/dashboard'
import { Tasks } from './assets/pages/tasks'
import { AddProject } from './assets/pages/addProject'
import { AddTasks } from './assets/pages/addTasks'
import { UpdateProject } from './assets/pages/updateProject'
import { UpdateTask } from './assets/pages/updateTask'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/signin" element={<Signin/>}></Route>
          <Route path="/dashboard" element={<Dashboard/>}></Route>
          <Route path='/tasks' element={<Tasks/>}></Route>
          <Route path='/dashboard/addProject' element={<AddProject/>}/>
          <Route path='/dashboard/:projectId/tasks' element={<Tasks/>}/>
          <Route path="/dashboard/:projectId/addTask" element={<AddTasks/>}/>
          <Route path="/dashboard/updateProject/:projectId" element={<UpdateProject />} />
          <Route path="/task/updateTask/:taskId" element={<UpdateTask />} />


        </Routes>
      </BrowserRouter>
        
    </div>
  )
}

export default App
