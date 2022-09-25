import React, { useContext, useEffect, useRef, useState } from "react";
import { photosCtx } from "../../context/PhotosCtx";
import Button from "../common/Button";
import Input from "../common/Input";
import SearchHistory from "./SearchHistory";
import autoAnimate from "@formkit/auto-animate";

const Search = () => {
  const [query, setQuery] = useState("");
  const [inputOnFocus, setInputOnFocus] = useState(false);
  const ctx = useContext(photosCtx);
  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query) return;
    setInputOnFocus(false);
    ctx?.handleSearchQuery(query);
    const input = document.querySelector("#searchInput") as HTMLInputElement;
    input.blur();
  };
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  useEffect(() => {
    if (ctx?.currentSearchQuery) setQuery(ctx?.currentSearchQuery);
  }, [ctx?.currentSearchQuery]);
  return (
    <div ref={parent} role="search">
      <form
        className="flex gap-3 sticky left-0 right-0"
        onSubmit={handleSearch}
      >
        <Input
          id="searchInput"
          type="text"
          placeholder="Search images"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onBlur={() => setInputOnFocus(false)}
          onFocus={() => setInputOnFocus(true)}
        />
        <Button type="submit">Search</Button>
      </form>
      {inputOnFocus && ctx?.searchHistory.length !== 0 && <SearchHistory />}
    </div>
  );
};

export default Search;
