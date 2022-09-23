import { useContext, useEffect, useRef, useState } from "react";
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
    ctx?.handleSearchQuery(query);
  };
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  useEffect(() => {
    if (ctx?.currentSearchQuery) setQuery(ctx?.currentSearchQuery);
  }, [ctx?.currentSearchQuery]);
  return (
    <div
      ref={parent}
      onBlur={() => setInputOnFocus(false)}
      onFocus={() => setInputOnFocus(true)}
    >
      <form
        className="flex gap-3 sticky left-0 right-0"
        onSubmit={handleSearch}
      >
        <Input
          type="text"
          placeholder="Search images"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button type="submit">Search</Button>
      </form>
      {inputOnFocus && ctx?.searchHistory.length !== 0 && <SearchHistory />}
    </div>
  );
};

export default Search;
