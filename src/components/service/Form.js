import app from './Firebase';
import {useCallback} from 'react';
import {AuthContext} from './Auth';
import {Redirect} from 'react-router-dom';
import {useContext} from 'react';
import './login.css';

export const Form = ({history}) => {
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
      <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
        <div style={{display: 'block', padding: '10px', margin: '0'}}>
          <form onSubmit={handleLogin} action="#">
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

          {/* <div className="flex-div">
            <div className="sign-up">
              <p id="sign-up-option">
                Don't have an account?
                <NavLink to={'/signup'}> Sign up</NavLink>
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};
