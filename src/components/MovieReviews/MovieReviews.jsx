import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { requestMovieReviews } from '../../services/tmdb-api';
import css from './MovieReviews.module.css';
import { useParams } from 'react-router-dom';

const MovieReviews = () => {
  const [reviews, setReviews] = useState([]);
  const { movieId: movieIdReviews } = useParams();

  useEffect(() => {
    async function fetchReviews() {
      try {
        setReviews([]);
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
