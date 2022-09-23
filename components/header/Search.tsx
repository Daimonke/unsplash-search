import { useContext, useState } from "react";
import { photosCtx } from "../../context/PhotosCtx";
import Button from "../common/Button";
import Input from "../common/Input";

const Search = () => {
  const [query, setQuery] = useState("");
  const ctx = useContext(photosCtx);
  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query) return;
    ctx?.handleSearchQuery(query);
    setQuery("");
  };
  return (
    <form className="flex gap-3 sticky left-0 right-0" onSubmit={handleSearch}>
      <Input
        type="text"
        placeholder="Search images"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button type="submit">Search</Button>
    </form>
  );
};

export default Search;
