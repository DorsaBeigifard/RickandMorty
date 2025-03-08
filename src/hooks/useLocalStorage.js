import { useEffect, useState } from "react";

export default function useLocalStorage(key, initialState) {
  const [value, setValue] = useState(
    () => JSON.parse(localStorage.getItem(key)) || initialState
  );
  // save favorites to local storage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  //return in an array cause it's an state -THE ORDER MATTERS
  return [value, setValue];
}
