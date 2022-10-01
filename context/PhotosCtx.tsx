import React, { createContext, useEffect, useState } from "react";

export type Tphoto = {
  id: string;
  created_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  likes: number;
  liked_by_user: boolean;
  description: string;
  user: any;
  current_user_collections: any;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  links: {
    self: string;
    html: string;
    download: string;
  };
};

export type TphotosRes = {
  total: number;
  total_pages: number;
  results: Tphoto[];
};

export type TphotosCtx = {
  currentSearchQuery: string;
  searchHistory: string[];
  handleSearchQuery: (query: string) => void;
  isQueryNew: boolean;
  setIsQueryNew: (value: boolean) => void;
};

export const photosCtx = createContext<TphotosCtx | null>(null);

const PhotosProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentSearchQuery, setCurrentSearchQuery] = useState("");
  const [isQueryNew, setIsQueryNew] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const handleSearchQuery = (query: string) => {
    if (query === searchHistory[0]) return;
    setIsQueryNew(true);
    setCurrentSearchQuery(query);
    if (searchHistory.includes(query)) {
      const newHistory = searchHistory.filter((item) => item !== query);
      newHistory.unshift(query);
      setSearchHistory(newHistory);
      localStorage.setItem("searchHistory", JSON.stringify(newHistory));
    } else if (searchHistory.length < 5) {
      const newHistory = [query, ...searchHistory];
      setSearchHistory(newHistory);
      localStorage.setItem("searchHistory", JSON.stringify(newHistory));
    } else {
      const newHistory = searchHistory;
      newHistory.pop();
      newHistory.unshift(query);
      setSearchHistory(newHistory);
      localStorage.setItem("searchHistory", JSON.stringify(newHistory));
    }
  };

  const ctxInitialValue: TphotosCtx = {
    currentSearchQuery,
    searchHistory,
    handleSearchQuery,
    isQueryNew,
    setIsQueryNew,
  };
  useEffect(() => {
    const history = localStorage.getItem("searchHistory");
    if (history) {
      const parsedHistory = JSON.parse(history);
      setCurrentSearchQuery(parsedHistory[0]);
      setSearchHistory(parsedHistory);
    } else {
      setCurrentSearchQuery("dogs");
    }
  }, []);
  return (
    <photosCtx.Provider value={ctxInitialValue}>{children}</photosCtx.Provider>
  );
};

export default PhotosProvider;
