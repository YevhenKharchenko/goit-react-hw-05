import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { requestMovieReviews } from '../../services/tmdb-api';
import css from './MovieReviews.module.css';

const MovieReviews = () => {
  const [reviews, setReviews] = useState(null);
  const { movieId: movieIdReviews } = useParams();

  useEffect(() => {
    async function fetchReviews() {
      try {
        const fetchedReviews = await requestMovieReviews(movieIdReviews);
        setReviews(fetchedReviews);
      } catch (error) {
        toast.error(
          `Oops! Something went wrong. Please try again later or contact support if the issue persists. Error details: ${error.message}`
        );
      }
    }

    fetchReviews();
  }, [movieIdReviews]);

  return Array.isArray(reviews) && reviews.length > 0 ? (
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
  ) : Array.isArray(reviews) ? (
    <p className={css.noReviews}>There are no reviews for this movie yet!</p>
  ) : null;
};

export default MovieReviews;
