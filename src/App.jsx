import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './Pages/Home';
import ToDoForm from './Components/ToDoForm';
import About from './Pages/About';
import Navbar from './Components/Navbar';
import { ToDoProvider } from './Context/ToDoContext';

function App() {
  

  return (
    <>
      <BrowserRouter>
        <ToDoProvider>
        <Navbar/>
        <Routes>

          <Route path='/' element={<Home/>}></Route>
          <Route path='/createTask' element={<ToDoForm/>}></Route>
          <Route path='/about' element={<About/>}></Route>

        </Routes>
        </ToDoProvider>
      </BrowserRouter>
    </>
  )
}

export default App
