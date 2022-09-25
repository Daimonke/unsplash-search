import { screen, render } from "@testing-library/react";
import SearchHistory from "../../../components/header/SearchHistory";
import "@testing-library/jest-dom";
import customRender from "../../../helpers/customRender";
import { TphotosCtx } from "../../../context/PhotosCtx";

describe("SearchHistory component", () => {
  it("renders SearchHistory", () => {
    render(<SearchHistory />);
    const searchHistory = screen.getByRole("list");
    expect(searchHistory).toBeInTheDocument();
  });
  it("renders SearchHistory with list items from context history", () => {
    const providerProps: Partial<TphotosCtx> = {
      searchHistory: ["dogs", "cats"],
    };
    customRender(<SearchHistory />, { providerProps });
    const searchHistoryItems = screen.queryAllByRole("listitem");
    expect(searchHistoryItems).toHaveLength(2);
  });
  it("renders SearchHistory with empty <ul> if context history is empty", () => {
    const providerProps: Partial<TphotosCtx> = {
      searchHistory: [],
    };
    customRender(<SearchHistory />, { providerProps });
    const searchHistoryItems = screen.queryAllByRole("listitem");
    expect(searchHistoryItems).toHaveLength(0);
  });
});
