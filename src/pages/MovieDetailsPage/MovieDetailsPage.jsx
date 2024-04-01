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
    <main>
      {!!movie && (
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt=""
          />
          <h1>{movie.title}</h1>
          <h2>Overview</h2>
          <p>{movie.overview}</p>
          <p>
            <b>Rating:</b> {movie.vote_average}
          </p>
          <p>
            <b>Popularity:</b> {movie.popularity}
          </p>
          <p>
            <b>Release date:</b> {movie.release_date}
          </p>
          <p>
            <b>Genre:</b>
            {movie.genres?.map(el => (
              <li key={el.id}>{el.name}</li>
            ))}
          </p>
        </div>
      )}
      <Link to="cast">Cast</Link>
      <Link to="reviews">Reviews</Link>
      <Outlet />
    </main>
  );
};

export default MovieDetailsPage;
