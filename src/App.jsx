import { BrowserRouter, Routes, Route } from "react-router";
import './App.css'
import { Login } from "./pages/LoginPage/LoginPage";

function App() {
  

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/Login' element={<Login/>} />



      </Routes>
    </BrowserRouter>
     
    
               
    </>
  )
}

export default App
