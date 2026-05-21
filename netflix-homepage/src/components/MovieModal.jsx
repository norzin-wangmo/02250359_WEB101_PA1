// Shows full details when user clicks a movie or "More Info"
function MovieModal({ movie, category, onClose, onPlay, isInList, onToggleList }) {
  if (!movie) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal movie-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close" onClick={onClose}>
          ×
        </button>
        <img src={movie.image} alt={movie.title} className="modal-movie-image" />
        <div className="modal-movie-body">
          <p className="modal-category">{category}</p>
          <h2>{movie.title}</h2>
          <p className="modal-description">
            {movie.description ||
              `Watch ${movie.title} on Heaven Online. Stream now in HD.`}
          </p>
          <div className="modal-actions">
            <button type="button" className="play-btn" onClick={onPlay}>
              ▶ Play
            </button>
            <button
              type="button"
              className="info-btn"
              onClick={onToggleList}
            >
              {isInList ? "✓ In My List" : "+ My List"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;
