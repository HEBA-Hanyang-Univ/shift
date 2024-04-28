import React, { createContext, useState, useContext, useEffect } from "react";

const KeywordsContext = createContext();

export const KeywordsProvider = ({ children }) => {
  const [keywords, setKeywords] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/epa_keywords')
      .then(res => res.json())
      .then(data => setKeywords(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <KeywordsContext.Provider value={{ keywords, setKeywords}}>
      {children}
    </KeywordsContext.Provider>
  );
}

export const useKeywords = () => useContext(KeywordsContext);