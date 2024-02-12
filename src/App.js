import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './components/Pages/Home';

function App() {
  return (
    <div className="App">
<BrowserRouter>
<Routes>
<Route element={<Home />} path="/home" />
</Routes>
</BrowserRouter>
    </div>
  );
}

export default App;
