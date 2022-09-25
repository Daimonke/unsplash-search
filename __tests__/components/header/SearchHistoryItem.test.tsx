import { screen, render, fireEvent } from "@testing-library/react";
import SearchHistoryItem from "../../../components/header/SearchHistoryItem";
import "@testing-library/jest-dom";
import customRender from "../../../helpers/customRender";
import { TphotosCtx } from "../../../context/PhotosCtx";

describe("SearchHistoryItem component", () => {
  it("renders SearchHistoryItem", () => {
    render(<SearchHistoryItem item="dogs" />);
    const searchHistoryItem = screen.getByRole("listitem");
    expect(searchHistoryItem).toHaveTextContent("dogs");
  });
  it("renders SearchHistoryItem", () => {
    const providerProps: Partial<TphotosCtx> = {
      handleSearchQuery: (query) => {
        providerProps.currentSearchQuery = query;
      },
      currentSearchQuery: "",
    };
    customRender(<SearchHistoryItem item="dogs" />, { providerProps });
    const searchHistoryItem = screen.getByRole("listitem");
    expect(providerProps.currentSearchQuery).toBe("");
    fireEvent.mouseDown(searchHistoryItem);
    expect(providerProps.currentSearchQuery).toBe("dogs");
  });
});
