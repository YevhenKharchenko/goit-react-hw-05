import { Link } from 'react-router-dom';
import css from './BackLink.module.css';

const BackLink = ({ to, children }) => {
  return (
    <Link to={to} className={css.link}>
      {children}
    </Link>
  );
};

export default BackLink;
