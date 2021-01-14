import React, { useContext } from "react";
import { Link, NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const Navbar = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  const logoutHandler = (e) => {
    e.preventDefault();
    auth.logout();
    history.push('/');
  };

  return (
    <nav>
      <div className="nav-wrapper cyan lighten-3"
        style={{padding: '0 2rem'}}
      >
        <span to="/" className="brand-logo">
          Cut the links
        </span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <NavLink to="/create">Create</NavLink>
          </li>
          <li>
            <NavLink to="/links">Links</NavLink>
          </li>
          <li>
            <Link to="/"
             onClick={logoutHandler}
            >
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
