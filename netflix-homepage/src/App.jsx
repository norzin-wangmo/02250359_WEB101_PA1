import { useCallback, useEffect, useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import HeroBanner from "./components/HeroBanner";
import MovieRow from "./components/MovieRow";
import Footer from "./components/Footer";
import SignInModal from "./components/SignInModal";
import MovieModal from "./components/MovieModal";
import StatusBanner from "./components/StatusBanner";
import { featuredMovie } from "./data/movies";
import { fetchMovieRows } from "./services/movieService";
import { APP_STATES } from "./utils/appStates";
import { ERROR_CODES, getErrorMessage } from "./utils/errorCodes";
import "./App.css";

function App() {
  const [appStatus, setAppStatus] = useState(APP_STATES.LOADING);
  const [errorCode, setErrorCode] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");

  const [movieRows, setMovieRows] = useState([]);
  const [userName, setUserName] = useState(null);
  const [showSignIn, setShowSignIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeNav, setActiveNav] = useState("Home");
  const [myListIds, setMyListIds] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [toast, setToast] = useState("");
  const [toastCode, setToastCode] = useState(null);

  const showToast = useCallback((message, code = ERROR_CODES.OK) => {
    setToast(message);
    setToastCode(code === ERROR_CODES.OK ? null : code);
  }, []);

  const setAppError = useCallback((code) => {
    setAppStatus(APP_STATES.ERROR);
    setErrorCode(code);
    setStatusMessage(getErrorMessage(code));
  }, []);

  const setAppSuccess = useCallback(() => {
    setAppStatus(APP_STATES.SUCCESS);
    setErrorCode(null);
    setStatusMessage("");
  }, []);

  // Simulate loading movies from API (movieService → later real backend)
  useEffect(() => {
    let cancelled = false;

    async function loadMovies() {
      setAppStatus(APP_STATES.LOADING);
      setErrorCode(null);
      setStatusMessage("");

      const result = await fetchMovieRows();

      if (cancelled) return;

      if (result.code === ERROR_CODES.OK && result.data) {
        setMovieRows(result.data);
        setAppSuccess();
      } else {
        setMovieRows([]);
        setAppError(result.code);
      }
    }

    loadMovies();
    return () => {
      cancelled = true;
    };
  }, [setAppError, setAppSuccess]);

  // Load My List from localStorage with error handling
  useEffect(() => {
    const saved = localStorage.getItem("netflixMyList");
    if (!saved) return;

    try {
      setMyListIds(JSON.parse(saved));
    } catch {
      setMyListIds([]);
      showToast(getErrorMessage(ERROR_CODES.ERR_STORAGE_READ), ERROR_CODES.ERR_STORAGE_READ);
    }
  }, [showToast]);

  useEffect(() => {
    try {
      localStorage.setItem("netflixMyList", JSON.stringify(myListIds));
    } catch {
      showToast(getErrorMessage(ERROR_CODES.ERR_STORAGE_WRITE), ERROR_CODES.ERR_STORAGE_WRITE);
    }
  }, [myListIds, showToast]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => {
      setToast("");
      setToastCode(null);
    }, 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const allMovies = useMemo(
    () => movieRows.flatMap((row) => row.movies),
    [movieRows]
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
    if (!movie) {
      showToast(getErrorMessage(ERROR_CODES.ERR_MOVIE_NOT_FOUND), ERROR_CODES.ERR_MOVIE_NOT_FOUND);
      return;
    }
    setSelectedMovie(movie);
    setSelectedCategory(category);
  };

  const toggleMyList = (movieId) => {
    if (!userName) {
      showToast(getErrorMessage(ERROR_CODES.ERR_AUTH_REQUIRED), ERROR_CODES.ERR_AUTH_REQUIRED);
      setShowSignIn(true);
      return;
    }

    setMyListIds((prev) => {
      if (prev.includes(movieId)) {
        showToast("Removed from My List", ERROR_CODES.OK);
        return prev.filter((id) => id !== movieId);
      }
      showToast("Added to My List", ERROR_CODES.OK);
      return [...prev, movieId];
    });
  };

  const handleSignIn = (name) => {
    setUserName(name);
    showToast(`Welcome, ${name}!`, ERROR_CODES.OK);
  };

  const handleSignOut = () => {
    setUserName(null);
    showToast("Signed out successfully", ERROR_CODES.OK);
  };

  const handleNavClick = (label) => {
    setActiveNav(label);
    setSearchQuery("");

    if (label === "Home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (label === "My List") {
      if (!userName) {
        showToast(getErrorMessage(ERROR_CODES.ERR_AUTH_REQUIRED), ERROR_CODES.ERR_AUTH_REQUIRED);
        setShowSignIn(true);
        return;
      }
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
    showToast(`Now playing: ${title}`, ERROR_CODES.OK);
  };

  const handleVideoError = () => {
    showToast(getErrorMessage(ERROR_CODES.ERR_VIDEO_PLAY), ERROR_CODES.ERR_VIDEO_PLAY);
  };

  const showMyListOnly = activeNav === "My List" && !searchQuery.trim() && userName;
  const visibleRows = showMyListOnly
    ? []
    : movieRows
        .map((row) => ({
          ...row,
          movies: filterBySearch(row.movies),
        }))
        .filter((row) => row.movies.length > 0);

  const searchHasNoResults =
    appStatus === APP_STATES.SUCCESS &&
    !showMyListOnly &&
    searchQuery.trim() &&
    visibleRows.length === 0;

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

      <StatusBanner
        appStatus={appStatus}
        message={statusMessage}
        errorCode={errorCode}
      />

      {appStatus === APP_STATES.SUCCESS && (
        <>
          <HeroBanner
            movie={featuredMovie}
            onMoreInfo={() => openMovie(featuredMovie, "Featured")}
            onPlay={() => handlePlay(featuredMovie.title)}
            onVideoError={handleVideoError}
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
                    Your list is empty. Sign in and click + on any movie to add it.
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

            {searchHasNoResults && (
              <p className="empty-message">
                {getErrorMessage(ERROR_CODES.ERR_SEARCH_NO_RESULTS)} &quot;{searchQuery}&quot;
              </p>
            )}

            {!showMyListOnly && userName && myListMovies.length > 0 && (
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
        </>
      )}

      <Footer />

      {toast && (
        <div className={`toast ${toastCode ? "toast-error" : "toast-success"}`}>
          {toast}
          {toastCode && <span className="toast-code"> [{toastCode}]</span>}
        </div>
      )}

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
