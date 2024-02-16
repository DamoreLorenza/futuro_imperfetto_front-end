import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './components/pages/Home';
import Event from './components/pages/Event';
import Login from './components/pages/Login';
import Games from './components/pages/Games';
import Reservation from './components/pages/Reservation';
import Registration from './components/pages/Registration';


function App() {
  return (
    <div className="App">
    <div className="imgUp">

<BrowserRouter>
<Routes>
<Route element={<Home />} path="/" />
<Route element={<Event />} path="/event" />
<Route element={<Login/>} path="/login" />
<Route element={<Games/>} path="/games" />
<Route element={<Reservation/>} path="/reservation" />
<Route element={<Registration/>} path="/registration" />
</Routes>
</BrowserRouter>

    </div>
    </div>
  );
}

export default App;
