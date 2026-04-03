import MovieCard from "./MovieCard";

function MovieRow({ title, movies }) {
  return (
    <section className="movie-row">
      <h3 className="row-title">{title}</h3>
      <div className="movie-row-container">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}

export default MovieRow;