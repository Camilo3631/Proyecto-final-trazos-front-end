import { BrowserRouter, Routes, Route } from "react-router";
import './App.css'
import { Navabar } from "./shared/Navbar/Navbar";
import { Login } from "./pages/LoginPage/LoginPage";
import { Register } from './pages/RegisterPage/RegisterPage'

function App() {
  

  return (
    <>
    <BrowserRouter>
     <Navabar />
      <Routes>
        <Route path='/Login' element={<Login/>} />
        <Route path='/Register' element={<Register/>} />



      </Routes>
    </BrowserRouter>
     
    
               
    </>
  )
}

export default App
