import CharacterDetail from "../components/CharacterDetail";
import CharacterList from "../components/CharacterList";
import NavBar, { SearchResult } from "../components/NavBar";
import "./App.css";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      // Using trycatch for error handling
      try {
        console.log("Fetching data...");
        setIsLoading(true);
        const { data } = await axios.get(
          "https://rickandmortyapi.com/api/character"
        );
        setCharacters(data.results.slice(0, 5));
        console.log("Data received:", data);
      } catch (error) {
        console.log(error.response.data.error);
        toast.error(error.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="app">
      <Toaster />
      {/* Component Composition for dealing with props drilling */}
      <NavBar>
        <SearchResult numOfResult={characters.length} />
      </NavBar>
      <Main>
        {isLoading ? <Loader /> : <CharacterList characters={characters} />}
        <CharacterDetail />
      </Main>
    </div>
  );
}

function Main({ children }) {
  return <div className="main">{children}</div>;
}
