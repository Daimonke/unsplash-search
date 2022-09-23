import { useContext, useState } from "react";
import { photosCtx, TphotosCtx } from "../../context/PhotosCtx";
import Button from "../common/Button";
import Input from "../common/Input";

const Search = () => {
  const [query, setQuery] = useState("");
  const { searchPhotos } = useContext(photosCtx) as TphotosCtx;
  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchPhotos(query);
    setQuery("");
  };
  return (
    <form className="flex gap-3" onSubmit={handleSearch}>
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
