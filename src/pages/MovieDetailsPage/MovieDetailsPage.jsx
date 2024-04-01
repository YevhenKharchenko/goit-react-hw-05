import { requestMovieDetails } from '../../services/tmdb-api';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    async function fetchMovie() {
      const response = await requestMovieDetails(movieId);
      setMovie(response);
    }

    fetchMovie();
  }, [movieId]);

  return (
    <div>
      {movie && <h1>{movie.original_title}</h1>}
      {movie && <p>{movie.overview}</p>}
      <Link to="cast">Cast</Link>
      <Link to="reviews">Reviews</Link>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
