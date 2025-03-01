import { HeartIcon } from "@heroicons/react/24/outline";

function NavBar({ children }) {
  return (
    <nav className="navbar">
      <div className="navbar__logo">LOGO ✨</div>
      {children}
    </nav>
  );
}

// Extracted only reusable components
export function Search({ query, setQuery }) {
  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      type="text"
      className="text-field"
      placeholder="Search..."
      aria-label="Search characters"
    />
  );
}

export function SearchResult({ numOfResult }) {
  return <div className="navbar__result">Found {numOfResult} characters</div>;
}

export function FavoriteButton({ numOfFavorites }) {
  return (
    <button className="heart">
      <HeartIcon className="icon" />
      <span className="badge">{numOfFavorites}</span>
    </button>
  );
}

export default NavBar;
