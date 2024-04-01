import { requestMovieCredits } from '../../services/tmdb-api';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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
    <ul>
      {cast.map(el => {
        return (
          <li key={el.id}>
            <p>
              {el.name} - {el.character}
            </p>
          </li>
        );
      })}
    </ul>
  );
};

export default MovieCast;
