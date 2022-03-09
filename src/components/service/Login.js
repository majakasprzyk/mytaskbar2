// import '../service/loginAndRegister.css';
import './login.css';
import {NavLink, Redirect, withRouter} from 'react-router-dom';
import React, {useContext} from 'react';

import {AuthContext} from './Auth';
import {Logo} from '../logo/Logo';
import {Form} from './Form';
// import iconEmail from '../../assets/iconEmail.png';

export const Login = () => {
  const currentUser = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/bartable" />;
  }

  return (
    <>
      <nav className="navigation_homepage">
        <Logo />
        <ul className="menu-nav">
          <NavLink className="link-register" to={'/signup'}>
            Zarejestruj się
          </NavLink>
        </ul>
      </nav>

      <div className="main-container box">
        <Form />
      </div>
    </>
  );
};

export default withRouter(Login);
