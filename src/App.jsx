import { BrowserRouter, Routes, Route } from "react-router";
import './App.css'
import { Login } from "./pages/LoginPage/LoginPage";
import { Register } from './pages/RegisterPage/RegisterPage'

function App() {
  

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/Login' element={<Login/>} />
        <Route path='/Register' element={<Register/>} />



      </Routes>
    </BrowserRouter>
     
    
               
    </>
  )
}

export default App
