import {
  trendingMovies,
  popularMovies,
  actionMovies,
  comedyMovies,
} from "../data/movies";
import { ERROR_CODES } from "../utils/errorCodes";

// Simulates backend API delay; replace fetch() when real server is added
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const DEFAULT_MOVIE_ROWS = [
  { id: "trending", title: "Trending Now", movies: trendingMovies },
  { id: "popular", title: "Popular on Netflix", movies: popularMovies },
  { id: "action", title: "Action Movies", movies: actionMovies },
  { id: "comedy", title: "Comedy Movies", movies: comedyMovies },
];

export async function fetchMovieRows() {
  await delay(500);

  try {
    if (!DEFAULT_MOVIE_ROWS.length) {
      return { code: ERROR_CODES.ERR_MOVIES_LOAD, data: null };
    }

    return { code: ERROR_CODES.OK, data: DEFAULT_MOVIE_ROWS };
  } catch {
    return { code: ERROR_CODES.ERR_MOVIES_LOAD, data: null };
  }
}
