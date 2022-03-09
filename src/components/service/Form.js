import app from './Firebase';
import {useCallback} from 'react';
import {NavLink} from 'react-router-dom';

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

  return (
    <>
      <div className="log-in-form">
        <div className="login-panel">
          <form onSubmit={handleLogin} action="#">
            <p>
              <label htmlFor="email"></label>
              <input
                type="email"
                placeholder="Enter email"
                name="email"
                className="input-design"
              />
            </p>
            <p>
              <label htmlFor="password"></label>
              <input
                type="password"
                placeholder="Enter password"
                name="password"
                className="input-design"
              />
            </p>
            <input
              type="submit"
              name="submit"
              value="Zaloguj"
              className="submit"
            />
          </form>
          <div className="flex-div">
            <div className="sign-up">
              <p id="sign-up-option">
                Don't have an account?
                <NavLink to={'/signup'}>Sign up</NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
