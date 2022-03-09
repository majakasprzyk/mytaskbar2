import './login.css';
import {NavLink, withRouter} from 'react-router-dom';
import app from './Firebase';
import {useCallback} from 'react';
import {AuthContext} from './Auth';
import {Redirect} from 'react-router-dom';
import {useContext} from 'react';
import './login.css';
import {Logo} from '../logo/Logo';
// import {Form} from './Form';

export const Login = ({history}) => {
  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const {email, password} = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push('/bartable');
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );
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
      <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
        <div style={{display: 'block', padding: '10px', margin: '0'}}>
          <form onSubmit={handleLogin} action="#">
            <h1 style={{padding: '15px'}}>Logowanie</h1>
            <label style={{fontWeight: '900'}} htmlFor="email">
              Adres email
            </label>
            <input type="email" name="email" className="input-design" />

            <label style={{fontWeight: '900'}} htmlFor="password">
              Hasło
            </label>
            <input type="password" name="password" className="input-design" />

            <input
              type="submit"
              name="submit"
              value="Zaloguj"
              className="submit"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default withRouter(Login);
