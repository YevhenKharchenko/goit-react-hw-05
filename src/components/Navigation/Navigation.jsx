import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { Toaster } from 'react-hot-toast';
import css from './Navigation.module.css';

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const Navigation = () => {
  return (
    <header className={css.header}>
      <nav className={css.nav}>
        <NavLink to="/" className={buildLinkClass}>
          Home
        </NavLink>
        <NavLink to="/movies" className={buildLinkClass}>
          Movies
        </NavLink>
      </nav>
      <Toaster position="top-right" />
    </header>
  );
};

export default Navigation;
