import CharacterDetail from "../components/CharacterDetail";
import CharacterList from "../components/CharacterList";
import NavBar, {
  FavoriteButton,
  Search,
  SearchResult,
} from "../components/NavBar";
import "./App.css";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // To fetch Data
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchData() {
      // Using trycatch for error handling
      try {
        console.log("Fetch ing data...");
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/?name=${query}`,
          { signal }
        );
        setCharacters(data.results.slice(0, 5));
        console.log("Data received:", data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("successfully aborted");
        } else {
          console.log(error.response.data.error);
          toast.error(error.response.data.error);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
    // CleanUp function
    return () => {
      // cancel the request before component unmounts
      controller.abort();
    };
  }, [query]);

  //To show chatacter detail
  const handleSelectCharacter = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };
  console.log(selectedId);

  const handleAddFavorite = (char) => {
    setFavorites((preFav) => [...preFav, char]);
  };

  // dreived prop:
  const isAddedToFavorite = favorites.map((f) => f.id).includes(selectedId);
  console.log(isAddedToFavorite);

  return (
    <div className="app">
      <Toaster />
      {/* Component Composition for dealing with props drilling */}
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <SearchResult numOfResult={characters.length} />
        <FavoriteButton numOfFavorites={favorites.length} />
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
