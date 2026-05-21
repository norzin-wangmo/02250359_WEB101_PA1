// One movie poster: click opens details, + toggles My List
function MovieCard({ movie, isInList, onSelect, onToggleList }) {
  return (
    <div className="movie-card">
      <button type="button" className="movie-card-main" onClick={onSelect}>
        <img src={movie.image} alt={movie.title} className="movie-image" />
        <p className="movie-title">{movie.title}</p>
      </button>
      <button
        type="button"
        className={`list-btn ${isInList ? "in-list" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          onToggleList();
        }}
        aria-label={isInList ? "Remove from My List" : "Add to My List"}
      >
        {isInList ? "✓" : "+"}
      </button>
    </div>
  );
}

export default MovieCard;
