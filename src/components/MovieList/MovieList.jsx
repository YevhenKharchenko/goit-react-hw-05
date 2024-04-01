import { Link } from 'react-router-dom';

const MovieList = ({ movies, location }) => {
  return (
    <ul>
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
