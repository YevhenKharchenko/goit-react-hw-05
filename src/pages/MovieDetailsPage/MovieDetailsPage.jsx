import MovieCast from '../../components/MovieCast/MovieCast';
import MovieReviews from '../../components/MovieReviews/MovieReviews';
import { requestMovieDetails } from '../../services/tmdb-api';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

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
    </div>
  );
};

export default MovieDetailsPage;
