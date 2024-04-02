import { Link } from 'react-router-dom';
import css from './MovieList.module.css';

const MovieList = ({ movies, location }) => {
  return (
    <ul className={css.list}>
      {Array.isArray(movies) &&
        movies.map(el => {
          return (
            <li key={el.id}>
              <Link to={`/movies/${el.id}`} state={{ from: location }}>
                {el.title}
              </Link>
            </li>
          );
        })}
    </ul>
  );
};

export default MovieList;
