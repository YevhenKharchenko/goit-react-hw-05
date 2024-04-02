import { requestMovieCredits } from '../../services/tmdb-api';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import css from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId: idMovie } = useParams();

  const [cast, setCast] = useState([]);

  useEffect(() => {
    async function fetchCast() {
      const response = await requestMovieCredits(idMovie);
      setCast(response);
    }

    fetchCast();
  }, [idMovie]);

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
