import React, {useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

function NavbarEx() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('jwtToken');
    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);
      setToken(decodedToken);
    }
  }, []);

  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="nav-logo">
          <h2>ActiveHub</h2>
          <div className="input-container">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="icon"/>
            <input type="text" />
          </div>
        </div>
        <div className="nav-links">
          <Link to="/" >Inicio</Link>
          <Link to="/events">Evento</Link>
            {token ? 
              <>
                <FontAwesomeIcon icon={faUser} className="profile-icon" /> 
                <p>Bienvenido {token.sub}</p>
              </>
              : 
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Registro</Link>
            </>}
        </div>
      </div>
    </nav>
  );
}

export default NavbarEx;
