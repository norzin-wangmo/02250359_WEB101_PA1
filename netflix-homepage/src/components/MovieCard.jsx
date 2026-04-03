function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <img src={movie.image} alt={movie.title} className="movie-image" />
      <p className="movie-title">{movie.title}</p>
    </div>
  );
}

export default MovieCard;