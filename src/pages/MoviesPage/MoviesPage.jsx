import { requestMovie } from '../../services/tmdb-api';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MoviesPage = () => {
  const [query, setMovie] = useState('');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!query.length) return;

    async function fetchMovie() {
      const response = await requestMovie(query);
      setMovies(response);
    }

    fetchMovie();
  }, [query]);

  function onSubmit(e) {
    e.preventDefault();

    const value = e.currentTarget.elements.name.value;
    setMovie(value);
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input name="name" type="text" />
        <button type="submit">Search</button>
      </form>
      <ul>
        {movies.map(el => {
          return (
            <li key={el.id}>
              <Link to={`/movies/${el.id}`}>{el.original_title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MoviesPage;
