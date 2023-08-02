import './App.css'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import { Appbar } from './pages/Appbar';
import {Login} from "./pages/Login";
import { Signup } from './pages/Signup';
import { Home } from './pages/Home';

function App() {
  
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={
            <>
              <Appbar/>
              <Home/>
            </>
          }/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
