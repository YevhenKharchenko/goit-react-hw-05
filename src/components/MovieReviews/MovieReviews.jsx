import { requestMovieReviews } from '../../services/tmdb-api';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import css from './MovieReviews.module.css';

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
    <ul className={css.list}>
      {reviews.map(el => {
        return (
          <li key={el.id} className={css.listItem}>
            <h3 className={css.itemTitle}>{el.author}</h3>
            <p className={css.itemText}>{el.content}</p>
          </li>
        );
      })}
    </ul>
  ) : (
    'No reviews'
  );
};

export default MovieReviews;
