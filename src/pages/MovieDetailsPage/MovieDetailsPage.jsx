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
  const [movieDetails, setMovieDetails] = useState([]);
  const location = useLocation();
  const backLinkHref = useRef(location.state?.from ?? '/');

  useEffect(() => {
    if (!movieId) return;

    async function fetchMovie() {
      try {
        setMovieDetails([]);
        const response = await requestMovieDetails(movieId);
        setMovieDetails(response);
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
      {!!movieDetails && (
        <>
          <div className={css.movieWrapper}>
            <img
              src={
                movieDetails.poster_path
                  ? `https://image.tmdb.org/t/p/w300${movieDetails.poster_path}`
                  : 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'
              }
              alt="Movie poster"
            />
            <div className={css.descriptionWrapper}>
              <h2 className={css.title}>{movieDetails.title}</h2>
              <p>
                <b>Overview:</b>
              </p>
              <p className={css.overview}>{movieDetails.overview}</p>
              <p>
                <b>Rating:</b> {movieDetails.vote_average}
              </p>
              <p>
                <b>Popularity:</b> {movieDetails.popularity}
              </p>
              <p>
                <b>Release date:</b> {movieDetails.release_date}
              </p>
              <div>
                <b>Genre:</b>
                {movieDetails.genres?.map(el => (
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
