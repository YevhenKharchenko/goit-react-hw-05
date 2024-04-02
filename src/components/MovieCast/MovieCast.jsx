import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { requestMovieCredits } from '../../services/tmdb-api';
import css from './MovieCast.module.css';

const MovieCast = ({ movieId }) => {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    async function fetchCast() {
      try {
        const response = await requestMovieCredits(movieId);
        setCast(response);
      } catch (error) {
        toast.error(
          `Oops! Something went wrong. Please try again later or contact support if the issue persists. Error details: ${error.message}`
        );
      }
    }

    fetchCast();
  }, [movieId]);

  return (
    <ul className={css.list}>
      {cast.map(el => {
        return (
          <li key={el.id} className={css.listItem}>
            <img
              src={
                el.profile_path
                  ? `https://image.tmdb.org/t/p/w200${el.profile_path}`
                  : 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'
              }
              alt={el.name}
              width={200}
              height={300}
              className={css.castImg}
            />
            <p className={css.itemText}>
              {el.name} - {el.character}
            </p>
          </li>
        );
      })}
    </ul>
  );
};

export default MovieCast;
