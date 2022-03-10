import {NavLink, withRouter} from 'react-router-dom';
import React, {useCallback} from 'react';
import app from './Firebase';
import {Logo} from '../logo/Logo';
import './login.css';

function Signup({history}) {
  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();
      const {email, password} = event.target.elements;
      try {
        await app
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);
        history.push('/bartable');
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  return (
    <>
      <nav className="navigation_homepage">
        <Logo />
        <ul className="menu-nav">
          <NavLink className="link-register" to={'/login'}>
            Zaloguj się
          </NavLink>
        </ul>
      </nav>
      <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
        <div
          style={{
            display: 'block',
            padding: '40px',
            margin: '40px',
            boxShadow: 'rgb(0 0 0 / 10%) 0 0 10px',
            backgroundColor: 'white',
          }}
        >
          <form onSubmit={handleSignUp} action="#">
            <h1>Rejestracja</h1>
            <label
              style={{fontWeight: '900', color: '#331e16'}}
              htmlFor="email"
            >
              Adres email
            </label>
            <input type="email" name="email" className="input-design" />

            <label
              style={{fontWeight: '900', color: '#331e16'}}
              htmlFor="password"
            >
              Hasło
            </label>
            <input type="password" name="password" className="input-design" />

            <input
              type="submit"
              name="submit"
              value="Zarejestruj"
              className="submit"
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default withRouter(Signup);
