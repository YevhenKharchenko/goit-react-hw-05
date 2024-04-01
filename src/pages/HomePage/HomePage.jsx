import MovieList from '../../components/MovieList/MovieList';
import { requestTrendingMovies } from '../../services/tmdb-api';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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
    <main>
      <h1>Trending today</h1>
      <MovieList movies={movies} location={location} />
    </main>
  );
};

export default HomePage;
