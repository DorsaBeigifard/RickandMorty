import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Modal from "../components/Modal";
import { Character } from "./CharacterList";

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

export function Favorite({ favorites, onDeleteFavorite }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <>
      <Modal
        open={isOpenModal}
        title="List Of Favorites"
        onOpen={setIsOpenModal}
      >
        {favorites.map((item) => (
          <Character
            item={item}
            key={item.id}
            onSelectCharacter={() => {}}
            selectedId={1}
          >
            <button
              className="icon red"
              onClick={() => onDeleteFavorite(item.id)}
            >
              <TrashIcon />
            </button>
          </Character>
        ))}
      </Modal>

      <button className="heart" onClick={() => setIsOpenModal((is) => !is)}>
        <HeartIcon className="icon" />
        <span className="badge">{favorites.length}</span>
      </button>
    </>
  );
}

export default NavBar;
