import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { requestMovieCredits } from '../../services/tmdb-api';
import css from './MovieCast.module.css';

const MovieCast = () => {
  const [cast, setCast] = useState([]);
  const { movieId: movieIdCast } = useParams();

  useEffect(() => {
    async function fetchCast() {
      try {
        setCast([]);
        const fetchedCredits = await requestMovieCredits(movieIdCast);
        setCast(fetchedCredits);
      } catch (error) {
        toast.error(
          `Oops! Something went wrong. Please try again later or contact support if the issue persists. Error details: ${error.message}`
        );
      }
    }

    fetchCast();
  }, [movieIdCast]);

  return cast.length ? (
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
  ) : (
    <p className={css.noCast}>There is no information about cast yet!</p>
  );
};

export default MovieCast;
