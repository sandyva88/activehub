import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './styles/App.css';
import Home from './pages/home/Home';
import Event from './pages/event/Event';
import NavbarEx from './components/Navbar';
import Register from './pages/register/Register';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Register />} />
        <Route path="/*" element={
          <>
            <NavbarEx  />
            <Routes >
              <Route path="/" element={<Home />} />
              <Route path="/event/:idEvent" element={<Event />} />
            </Routes>
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;
