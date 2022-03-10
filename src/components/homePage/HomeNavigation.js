import {NavLink} from 'react-router-dom';
import {Logo} from '../logo/Logo';
import '../homePage/homepage.css';

export const HomeNavigation = () => {
  return (
    <>
      <nav className="navigation_homepage">
        <Logo />
        <ul className="menu-nav">
          <NavLink className="link-nav" to={'/login'}>
            Zaloguj
          </NavLink>
          <NavLink className="link-register" to={'/signup'}>
            Zarejestruj się
          </NavLink>
        </ul>
      </nav>
      ;
    </>
  );
};
