import { requestMovie } from '../../services/tmdb-api';
import { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList';
import css from './MoviesPage.module.css';

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
    <main className={css.main}>
      <form onSubmit={onSubmit} className={css.form}>
        <input name="name" type="text" className={css.input} />
        <button type="submit" className={css.btn}>
          Search
        </button>
      </form>
      <MovieList movies={movies} location={location} />
    </main>
  );
};

export default MoviesPage;
