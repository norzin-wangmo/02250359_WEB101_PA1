import { useEffect, useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import HeroBanner from "./components/HeroBanner";
import MovieRow from "./components/MovieRow";
import Footer from "./components/Footer";
import SignInModal from "./components/SignInModal";
import MovieModal from "./components/MovieModal";
import {
  trendingMovies,
  popularMovies,
  actionMovies,
  comedyMovies,
  featuredMovie,
} from "./data/movies";
import "./App.css";

const MOVIE_ROWS = [
  { id: "trending", title: "Trending Now", movies: trendingMovies },
  {
    id: "popular",
    title: "Popular on Netflix",
    movies: popularMovies,
  },
  { id: "action", title: "Action Movies", movies: actionMovies },
  { id: "comedy", title: "Comedy Movies", movies: comedyMovies },
];

function App() {
  const [userName, setUserName] = useState(null);
  const [showSignIn, setShowSignIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeNav, setActiveNav] = useState("Home");
  const [myListIds, setMyListIds] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [toast, setToast] = useState("");

  // Load saved My List from browser storage on first visit
  useEffect(() => {
    const saved = localStorage.getItem("netflixMyList");
    if (saved) {
      try {
        setMyListIds(JSON.parse(saved));
      } catch {
        setMyListIds([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("netflixMyList", JSON.stringify(myListIds));
  }, [myListIds]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(""), 2500);
    return () => clearTimeout(timer);
  }, [toast]);

  const allMovies = useMemo(
    () => MOVIE_ROWS.flatMap((row) => row.movies),
    []
  );

  const myListMovies = useMemo(
    () => allMovies.filter((movie) => myListIds.includes(movie.id)),
    [allMovies, myListIds]
  );

  const filterBySearch = (movies) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return movies;
    return movies.filter((m) => m.title.toLowerCase().includes(q));
  };

  const openMovie = (movie, category) => {
    setSelectedMovie(movie);
    setSelectedCategory(category);
  };

  const toggleMyList = (movieId) => {
    setMyListIds((prev) => {
      if (prev.includes(movieId)) {
        setToast("Removed from My List");
        return prev.filter((id) => id !== movieId);
      }
      setToast("Added to My List");
      return [...prev, movieId];
    });
  };

  const handleSignIn = (name) => {
    setUserName(name);
    setToast(`Welcome, ${name}!`);
  };

  const handleSignOut = () => {
    setUserName(null);
    setToast("Signed out successfully");
  };

  const handleNavClick = (label) => {
    setActiveNav(label);
    setSearchQuery("");

    if (label === "Home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (label === "My List") {
      document.getElementById("my-list-section")?.scrollIntoView({
        behavior: "smooth",
      });
      return;
    }

    const sectionMap = {
      "TV Shows": "trending",
      Movies: "action",
      "New & Popular": "popular",
    };
    const sectionId = sectionMap[label];
    if (sectionId) {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const handlePlay = (title) => {
    setToast(`Now playing: ${title}`);
  };

  const showMyListOnly = activeNav === "My List" && !searchQuery.trim();
  const visibleRows = showMyListOnly
    ? []
    : MOVIE_ROWS.map((row) => ({
        ...row,
        movies: filterBySearch(row.movies),
      })).filter((row) => row.movies.length > 0);

  return (
    <div className="app">
      <Navbar
        userName={userName}
        searchQuery={searchQuery}
        activeNav={activeNav}
        onSearchChange={setSearchQuery}
        onNavClick={handleNavClick}
        onSignInClick={() => setShowSignIn(true)}
        onSignOut={handleSignOut}
      />

      <HeroBanner
        movie={featuredMovie}
        onMoreInfo={() => openMovie(featuredMovie, "Featured")}
        onPlay={() => handlePlay(featuredMovie.title)}
      />

      <div className="rows-container">
        {showMyListOnly && (
          <section id="my-list-section">
            {myListMovies.length > 0 ? (
              <MovieRow
                id="my-list"
                title="My List"
                movies={myListMovies}
                onMovieClick={(movie) => openMovie(movie, "My List")}
                onToggleList={toggleMyList}
                myListIds={myListIds}
              />
            ) : (
              <p className="empty-message">
                Your list is empty. Click + on any movie to add it.
              </p>
            )}
          </section>
        )}

        {!showMyListOnly &&
          visibleRows.map((row) => (
            <MovieRow
              key={row.id}
              id={row.id}
              title={row.title}
              movies={row.movies}
              onMovieClick={(movie) => openMovie(movie, row.title)}
              onToggleList={toggleMyList}
              myListIds={myListIds}
            />
          ))}

        {!showMyListOnly && searchQuery.trim() && visibleRows.length === 0 && (
          <p className="empty-message">No movies found for &quot;{searchQuery}&quot;</p>
        )}

        {!showMyListOnly && myListMovies.length > 0 && (
          <MovieRow
            id="my-list-section"
            title="My List"
            movies={myListMovies}
            onMovieClick={(movie) => openMovie(movie, "My List")}
            onToggleList={toggleMyList}
            myListIds={myListIds}
          />
        )}
      </div>

      <Footer />

      {toast && <div className="toast">{toast}</div>}

      {showSignIn && (
        <SignInModal
          onClose={() => setShowSignIn(false)}
          onSignIn={handleSignIn}
        />
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          category={selectedCategory}
          isInList={myListIds.includes(selectedMovie.id)}
          onClose={() => setSelectedMovie(null)}
          onPlay={() => handlePlay(selectedMovie.title)}
          onToggleList={() => toggleMyList(selectedMovie.id)}
        />
      )}
    </div>
  );
}

export default App;
