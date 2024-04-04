import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { requestTrendingMovies } from '../../services/tmdb-api';
import MovieList from '../../components/MovieList/MovieList';
import css from './HomePage.module.css';

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const fetchedMovies = await requestTrendingMovies();
        setTrendingMovies(fetchedMovies);
      } catch (error) {
        toast.error(
          `Oops! Something went wrong. Please try again later or contact support if the issue persists. Error details: ${error.message}`
        );
      }
    }

    fetchMovies();
  }, []);

  return (
    <main className={css.main}>
      <h1 className={css.mainTitle}>Trending today</h1>
      <MovieList movies={trendingMovies} />
    </main>
  );
};

export default HomePage;
