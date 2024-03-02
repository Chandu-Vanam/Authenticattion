import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Login from './components/login/Login'
import Home from './components/home/Home'
import Dashboard from './components/dashboard/Dashboard'
import Logout from './components/logout/Logout'
import Register from './components/register/Register'
import { ToastContainer, toast } from 'react-toastify';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route exact path='/login' element={<Login />}></Route>
          <Route exact path='/register' element={<Register />}></Route>
          <Route exact path='/dashboard' element={<Dashboard />}></Route>
          <Route exact path='/logout' element={<Logout />}></Route>
        </Routes>
      </Router>
      <ToastContainer position='top-center' />
    </>
  )
}

export default App
