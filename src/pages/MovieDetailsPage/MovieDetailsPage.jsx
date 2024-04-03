import clsx from 'clsx';
import toast from 'react-hot-toast';
import { useState, useEffect, Suspense, useRef } from 'react';
import { NavLink, useParams, useLocation, Outlet } from 'react-router-dom';
import { requestMovieDetails } from '../../services/tmdb-api';
import Loader from '../../components/Loader/Loader.jsx';
import BackLink from '../../components/BackLink/BackLink.jsx';
import css from './MovieDetailsPage.module.css';

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState([]);
  const location = useLocation();
  const backLinkHref = useRef(location.state?.from ?? '/');

  useEffect(() => {
    async function fetchMovie() {
      try {
        setMovie([]);
        const response = await requestMovieDetails(movieId);
        setMovie(response);
      } catch (error) {
        toast.error(
          `Oops! Something went wrong. Please try again later or contact support if the issue persists. Error details: ${error.message}`
        );
      }
    }

    fetchMovie();
  }, [movieId]);

  return (
    <main className={css.main}>
      <div className={css.backLinkWrapper}>
        <BackLink to={backLinkHref.current} className={css.backLink}>
          Back to movies
        </BackLink>
      </div>
      {!!movie && (
        <>
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
            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
          </div>
        </>
      )}
    </main>
  );
};

export default MovieDetailsPage;
