import { HeartIcon } from "@heroicons/react/24/outline";

function NavBar({ children }) {
  return (
    <nav className="navbar">
      <div className="navbar__logo">LOGO ✨</div>
      <SearchInput />
      {children}
      <FavoriteButton count={4} />
    </nav>
  );
}

// Extracted only reusable components
function SearchInput() {
  return (
    <input
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

function FavoriteButton({ count }) {
  return (
    <button className="heart">
      <HeartIcon className="icon" />
      {count > 0 && <span className="badge">{count}</span>}
    </button>
  );
}

export default NavBar;
