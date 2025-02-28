import CharacterDetail from "../components/CharacterDetail";
import CharacterList from "../components/CharacterList";
import NavBar, { SearchResult } from "../components/NavBar";
import "./App.css";
import { allCharacters } from "../data/data";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";

export default function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      console.log("Fetching data...");
      setIsLoading(true);
      const res = await fetch("https://rickandmortyapi.com/api/character");
      const data = await res.json();
      setCharacters(data.results.slice(0, 5));
      setIsLoading(false);
      console.log("Data received:", data);
    }

    fetchData();
  }, []);

  // Second Way
  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch("https://rickandmortyapi.com/api/character")
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setCharacters(data.results.slice(0, 5));
  //       setIsLoading(false);
  //     }));
  // }, []);

  return (
    <div className="app">
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
