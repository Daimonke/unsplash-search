import { useContext, useEffect, useState } from "react";
import { photosCtx } from "../../context/PhotosCtx";
import SearchHistoryItem from "./SearchHistoryItem";

const SearchHistory = () => {
  const ctx = useContext(photosCtx);

  return (
    <ul className="bg-gray-100 my-2 py-3 px-4 text-sm gap-3 border-2 border-blue-300 rounded-lg flex flex-col">
      {ctx?.searchHistory.map((item, i) => (
        <SearchHistoryItem key={i} item={item} />
      ))}
    </ul>
  );
};

export default SearchHistory;
