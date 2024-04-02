import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={css.list}>
      {Array.isArray(movies) &&
        movies.map(el => {
          return (
            <li key={el.id} className={css.listItem}>
              <Link to={`/movies/${el.id}`} state={{ from: location }}>
                <div>
                  <img
                    src={`https://image.tmdb.org/t/p/w300${el.backdrop_path}`}
                    alt={el.title}
                    width={200}
                  />
                  <div className={css.itemTextWrapper}>
                    <p className={css.title}>
                      {el.title} ({el.release_date.slice(0, 4)})
                    </p>
                    <p className={css.rating}>
                      <b>Rating:</b> {el.vote_average}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
    </ul>
  );
};

export default MovieList;
