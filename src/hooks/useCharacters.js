import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function useCharacters(url, query) {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //to fetch data - useEffect in a custom hook
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchData() {
      // Using trycatch for error handling
      try {
        console.log("Fetch ing data...");
        setIsLoading(true);
        const { data } = await axios.get(`${url}=${query}`, { signal });
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

  return {
    isLoading,
    characters,
  };
}
