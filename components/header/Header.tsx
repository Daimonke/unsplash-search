import Button from "../common/Button";
import Input from "./Input";

const Header = () => {
  return (
    <form className="flex gap-3">
      <Input type="text" placeholder="Search images" />
      <Button type="submit">Search</Button>
    </form>
  );
};

export default Header;
