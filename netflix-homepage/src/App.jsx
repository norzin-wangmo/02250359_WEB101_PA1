import Navbar from "./components/Navbar";
import HeroBanner from "./components/HeroBanner";
import MovieRow from "./components/MovieRow";
import {
  trendingMovies,
  popularMovies,
  actionMovies,
  comedyMovies,
} from "./data/movies";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Navbar />
      <HeroBanner />

      <div className="rows-container">
        <MovieRow title="Trending Now" movies={trendingMovies} />
        <MovieRow title="Popular on Heaven Online" movies={popularMovies} />
        <MovieRow title="Action Movies" movies={actionMovies} />
        <MovieRow title="Comedy Movies" movies={comedyMovies} />
      </div>
    </div>
  );
}

export default App;