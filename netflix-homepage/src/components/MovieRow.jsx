import { useRef } from "react";
import MovieCard from "./MovieCard";

// Reusable row with horizontal scroll buttons and movie cards
function MovieRow({
  id,
  title,
  movies,
  onMovieClick,
  onToggleList,
  myListIds,
}) {
  const rowRef = useRef(null);

  const scrollRow = (direction) => {
    if (!rowRef.current) return;
    const amount = direction === "left" ? -320 : 320;
    rowRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="movie-row" id={id}>
      <div className="row-header">
        <h3 className="row-title">{title}</h3>
        <div className="row-controls">
          <button
            type="button"
            className="scroll-btn"
            onClick={() => scrollRow("left")}
            aria-label={`Scroll ${title} left`}
          >
            ‹
          </button>
          <button
            type="button"
            className="scroll-btn"
            onClick={() => scrollRow("right")}
            aria-label={`Scroll ${title} right`}
          >
            ›
          </button>
        </div>
      </div>
      <div className="movie-row-container" ref={rowRef}>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isInList={myListIds.includes(movie.id)}
            onSelect={() => onMovieClick(movie)}
            onToggleList={() => onToggleList(movie.id)}
          />
        ))}
      </div>
    </section>
  );
}

export default MovieRow;
