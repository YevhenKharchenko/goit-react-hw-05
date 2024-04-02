import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { requestMovieReviews } from '../../services/tmdb-api';
import css from './MovieReviews.module.css';

const MovieReviews = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchCast() {
      try {
        const response = await requestMovieReviews(movieId);
        setReviews(response);
      } catch (error) {
        toast.error(
          `Oops! Something went wrong. Please try again later or contact support if the issue persists. Error details: ${error.message}`
        );
      }
    }

    fetchCast();
  }, [movieId]);

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
    <p className={css.noReviews}>There are no reviews for this movie yet!</p>
  );
};

export default MovieReviews;
