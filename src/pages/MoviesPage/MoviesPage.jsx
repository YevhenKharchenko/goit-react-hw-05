import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { requestMovie } from '../../services/tmdb-api';
import MovieList from '../../components/MovieList/MovieList';
import css from './MoviesPage.module.css';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';

  useEffect(() => {
    if (query === '') return;

    async function fetchMovie() {
      try {
        const response = await requestMovie(query);
        setMovies(response);
      } catch (error) {
        toast.error(
          `Oops! Something went wrong. Please try again later or contact support if the issue persists. Error details: ${error.message}`
        );
      }
    }

    fetchMovie();
  }, [query]);

  function onSubmit(e) {
    e.preventDefault();

    const value = e.currentTarget.elements.name.value;

    if (!value.length)
      toast.error('Input field is empty. Please provide a value.');

    setSearchParams({ query: value });
  }

  return (
    <main className={css.main}>
      <form onSubmit={onSubmit} className={css.form}>
        <input
          name="name"
          type="text"
          className={css.input}
          placeholder="Search movies"
        />
        <button type="submit" className={css.btn}>
          Search
        </button>
      </form>
      <MovieList movies={movies} />
    </main>
  );
};

export default MoviesPage;
