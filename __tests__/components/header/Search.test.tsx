import { render, screen, fireEvent } from "@testing-library/react";
import Search from "../../../components/header/Search";
import "@testing-library/jest-dom";
import customRender from "../../../helpers/customRender";
import { TphotosCtx } from "../../../context/PhotosCtx";

const providerProps: Partial<TphotosCtx> = {
  searchHistory: ["dogs", "cats"],
  currentSearchQuery: "",
  handleSearchQuery: (query) => {
    providerProps.currentSearchQuery = query;
  },
};

describe("Search component", () => {
  it("renders Search", () => {
    render(<Search />);
    const search = screen.getByRole("search");
    expect(search).toBeInTheDocument();
  });

  it("has working input", () => {
    render(<Search />);
    const input = screen.getByPlaceholderText("Search images");
    expect(input).toHaveValue("");
    fireEvent.change(input, { target: { value: "dogs" } });
    expect(input).toHaveValue("dogs");
  });

  it("has button", () => {
    render(<Search />);
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Search");
  });

  it("has searchHistory and input on focus opens SearchHistory component", () => {
    customRender(<Search />, { providerProps });
    const input = screen.getByPlaceholderText("Search images");
    fireEvent.focus(input);
    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(2);
  });

  it("has searchHistory and input onBlur closes SearchHistory component", () => {
    customRender(<Search />, { providerProps });
    const input = screen.getByPlaceholderText("Search images");
    fireEvent.focus(input);
    const listItems = screen.queryAllByRole("listitem");
    expect(listItems).toHaveLength(2);
    fireEvent.blur(input);
    const newListItems = screen.queryAllByRole("listitem");
    expect(newListItems).toHaveLength(0);
  });

  it("handleSearch function works", () => {
    customRender(<Search />, { providerProps });
    const input = screen.getByPlaceholderText("Search images");
    const button = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "dogs" } });
    fireEvent.click(button);
    expect(input).toHaveValue("dogs");
    expect(providerProps.currentSearchQuery).toBe("dogs");
  });

  it("handleSearch function doesnt work if query isnt provided", () => {
    customRender(<Search />, { providerProps });
    const input = screen.getByPlaceholderText("Search images");
    const button = screen.getByRole("button");
    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(button);
    expect(input).toHaveValue("");
    expect(providerProps.currentSearchQuery).toBe("dogs");
  });
});
