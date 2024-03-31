import { requestTrendingMovies } from '../../services/tmdb-api';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      const fetchedMovies = await requestTrendingMovies();
      setMovies(fetchedMovies);
    }

    fetchMovies();
  }, []);

  return (
    <ul>
      {movies.map(el => {
        return (
          <li key={el.id}>
            <Link to={`/movies/${el.id}`}>{el.original_title}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default MovieList;
