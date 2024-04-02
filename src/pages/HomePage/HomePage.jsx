import MovieList from '../../components/MovieList/MovieList';
import { requestTrendingMovies } from '../../services/tmdb-api';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import css from './HomePage.module.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    async function fetchMovies() {
      const fetchedMovies = await requestTrendingMovies();
      setMovies(fetchedMovies);
    }

    fetchMovies();
  }, []);

  return (
    <main className={css.main}>
      <h1 className={css.mainTitle}>Trending today</h1>
      <MovieList movies={movies} location={location} />
    </main>
  );
};

export default HomePage;
