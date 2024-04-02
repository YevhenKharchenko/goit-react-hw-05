import { requestMovieDetails } from '../../services/tmdb-api';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import clsx from 'clsx';
import css from './MovieDetailsPage.module.css';

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

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
    <main className={css.main}>
      {!!movie && (
        <div className={css.movieWrapper}>
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt=""
          />
          <div className={css.descriptionWrapper}>
            <h2 className={css.title}>{movie.title}</h2>
            <p>
              <b>Overview:</b>
            </p>
            <p className={css.overview}>{movie.overview}</p>
            <p>
              <b>Rating:</b> {movie.vote_average}
            </p>
            <p>
              <b>Popularity:</b> {movie.popularity}
            </p>
            <p>
              <b>Release date:</b> {movie.release_date}
            </p>
            <div>
              <b>Genre:</b>
              {movie.genres?.map(el => (
                <div key={el.id} className={css.genreItem}>
                  {el.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className={css.wrapper}>
        <p className={css.informText}>
          <b>Additional information</b>
        </p>
        <div className={css.linksWrapper}>
          <NavLink to="cast" className={buildLinkClass}>
            Cast
          </NavLink>
          <NavLink to="reviews" className={buildLinkClass}>
            Reviews
          </NavLink>
        </div>
        <Outlet />
      </div>
    </main>
  );
};

export default MovieDetailsPage;
