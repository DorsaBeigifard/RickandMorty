import CharacterDetail from "../components/CharacterDetail";
import CharacterList from "../components/CharacterList";
import NavBar, { Favorite, Search, SearchResult } from "../components/NavBar";
import "./App.css";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import useCharacters from "./hooks/useCharacters";
import toast, { Toaster } from "react-hot-toast";
import useLocalStorage from "./hooks/useLocalStorage";

export default function App() {
  const [query, setQuery] = useState("");
  // Custom Hook for fetching characters data
  const { isLoading, characters } = useCharacters(
    "https://rickandmortyapi.com/api/character/?name",
    query
  );
  const [selectedId, setSelectedId] = useState(null);

  const [favorites, setFavorites] = useLocalStorage("Favorites", []);

  //To show chatacter detail
  const handleSelectCharacter = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };

  // favotites
  const handleAddFavorite = (char) => {
    setFavorites((preFav) => [...preFav, char]);
  };
  const handleDeleteFavorite = (id) => {
    setFavorites((preFave) => preFave.filter((fav) => fav.id !== id));
  };
  // dreived prop:
  const isAddedToFavorite = favorites.map((f) => f.id).includes(selectedId);

  return (
    <div className="app">
      <Toaster />
      {/* Component Composition for dealing with props drilling */}
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <SearchResult numOfResult={characters.length} />
        <Favorite
          favorites={favorites}
          onDeleteFavorite={handleDeleteFavorite}
        />
      </NavBar>
      <Main>
        {isLoading ? (
          <Loader />
        ) : (
          <CharacterList
            selectedId={selectedId}
            characters={characters}
            onSelectCharacter={handleSelectCharacter}
          />
        )}
        <CharacterDetail
          selectedId={selectedId}
          onAddFavorite={handleAddFavorite}
          isAddedToFavorite={isAddedToFavorite}
        />
      </Main>
    </div>
  );
}

function Main({ children }) {
  return <div className="main">{children}</div>;
}
