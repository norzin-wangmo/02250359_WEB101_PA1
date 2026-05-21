// Top bar: search, navigation, sign in / sign out
function Navbar({
  userName,
  searchQuery,
  activeNav,
  onSearchChange,
  onNavClick,
  onSignInClick,
  onSignOut,
}) {
  const links = ["Home", "TV Shows", "Movies", "New & Popular", "My List"];

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="logo" onClick={() => onNavClick("Home")}>
          HEAVEN ONLINE
        </h1>
        <ul className="nav-links">
          {links.map((label) => (
            <li
              key={label}
              className={activeNav === label ? "active" : ""}
              onClick={() => onNavClick(label)}
            >
              {label}
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-right">
        <input
          type="search"
          className="search-input"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search movies"
        />
        {userName ? (
          <>
            <span className="user-greeting">Hi, {userName}</span>
            <button type="button" className="nav-button secondary" onClick={onSignOut}>
              Sign Out
            </button>
          </>
        ) : (
          <button type="button" className="nav-button" onClick={onSignInClick}>
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
