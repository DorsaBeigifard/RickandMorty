import CharacterDetail from "../components/CharacterDetail";
import CharacterList from "../components/CharacterList";
import NavBar, { SearchResult } from "../components/NavBar";
import "./App.css";
import { allCharacters } from "../data/data";
import { useState } from "react";
export default function App() {
  const [characters, setCharecters] = useState(allCharacters);

  return (
    <div className="app">
      {/* Component Composition for dealing with props drilling */}
      <NavBar>
        <SearchResult numOfResult={characters.length} />
        
      </NavBar>
      <Main>
        <CharacterList characters={characters} />
        <CharacterDetail />
      </Main>
    </div>
  );
}

function Main({ children }) {
  return <div className="main">{children}</div>;
}
