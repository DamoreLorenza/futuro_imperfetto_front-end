import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './components/pages/Home';
import { Container, Row } from 'react-bootstrap';
import Event from './components/pages/Event';


function App() {
  return (
    <div className="App">
    <div className="imgUp">


    

<BrowserRouter>
<Routes>
<Route element={<Home />} path="/" />
<Route element={<Event />} path="/event" />
</Routes>
</BrowserRouter>

    </div>
    </div>
  );
}

export default App;
