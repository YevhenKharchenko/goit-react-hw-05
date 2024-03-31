import axios from 'axios';

const apiToken = import.meta.env.VITE_API_TOKEN;

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${apiToken}`,
  },
};

export const requestTrendingMovies = async () => {
  const response = await axios.get(
    'https://api.themoviedb.org/3/trending/movie/day?language=en-US',
    options
  );

  return response.data.results;
};

export const requestMovie = async query => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
    options
  );

  return response.data.results;
};

export const requestMovieDetails = async movieId => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
    options
  );

  return response.data;
};

export const requestMovieCredits = async movieId => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
    options
  );

  return response.data.cast;
};

export const requestMovieReviews = async movieId => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`,
    options
  );

  return response.data.results;
};
