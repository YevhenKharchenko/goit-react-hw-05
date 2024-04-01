import { requestMovieReviews } from '../../services/tmdb-api';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const MovieReviews = () => {
  const { movieId: idMovies } = useParams();

  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    async function fetchCast() {
      const response = await requestMovieReviews(idMovies);
      setReviews(response);
    }

    fetchCast();
  }, [idMovies]);

  return reviews.length ? (
    <ul>
      {reviews.map(el => {
        return (
          <li key={el.id}>
            <h2>{el.author}</h2>
            <p>{el.content}</p>
          </li>
        );
      })}
    </ul>
  ) : (
    'No reviews'
  );
};

export default MovieReviews;
