import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './components/Pages/Home';
import Event from './components/Pages/Event';
import Login from './components/Pages/Login';
import Games from './components/Pages/Games';
import Reservation from './components/Pages/Reservation';
import Registration from './components/Pages/Registration';
import ReservationListPage from './components/Pages/ReservationListPage';



function App() {
  return (
    <>
   
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
<Route element={<ReservationListPage/>} path="/reservationListPage" />
</Routes>
</BrowserRouter>

    </div>
  
    </div>

</>
  );
}

export default App;
