import { requestMovie } from '../../services/tmdb-api';
import { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const location = useLocation();

  useEffect(() => {
    if (query === '') return;

    async function fetchMovie() {
      const response = await requestMovie(query);
      setMovies(response);
    }

    fetchMovie();
  }, [query]);

  function onSubmit(e) {
    e.preventDefault();

    const value = e.currentTarget.elements.name.value;
    setSearchParams({ query: value });
  }

  return (
    <main>
      <form onSubmit={onSubmit}>
        <input name="name" type="text" />
        <button type="submit">Search</button>
      </form>
      <MovieList movies={movies} location={location} />
    </main>
  );
};

export default MoviesPage;
