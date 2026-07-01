import { BrowserRouter, Routes, Route } from "react-router";
import './App.css'
import { Navabar } from "./shared/Navbar/Navbar";
import { Home } from './pages/HomePage/HomePage'
import { Login } from "./pages/LoginPage/LoginPage";
import { Register } from './pages/RegisterPage/RegisterPage'
import { Footer } from "./shared/Footer/Footer";


function App() {
  

  return (
    <>
    <BrowserRouter>
     <Navabar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/Login' element={<Login/>} />
        <Route path='/Register' element={<Register/>} />
     



      </Routes>
      <Footer/>
    </BrowserRouter>
     
    
               
    </>
  )
}

export default App
