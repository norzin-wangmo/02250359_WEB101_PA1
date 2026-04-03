function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="logo">HEAVEN ONLINE</h1>
        <ul className="nav-links">
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
        </ul>
      </div>

      <div className="navbar-right">
        <button className="nav-button">Sign In</button>
      </div>
    </nav>
  );
}

export default Navbar;