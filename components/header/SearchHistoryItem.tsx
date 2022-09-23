import React, { useContext } from "react";
import { photosCtx } from "../../context/PhotosCtx";

type Props = {
  item: string;
};

const SearchHistoryItem = ({ item }: Props) => {
  const ctx = useContext(photosCtx);
  const handleClick = () => {
    console.log(item);
    ctx?.handleSearchQuery(item);
  };
  return (
    <li className="text-gray-600" onMouseDown={handleClick}>
      {item}
    </li>
  );
};

export default SearchHistoryItem;
