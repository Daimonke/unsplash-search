import { render, screen } from "@testing-library/react";
import Header from "../../../components/header/Header";
import "@testing-library/jest-dom";

describe("Header component", () => {
  it("renders Header", () => {
    render(<Header />);
    const header = screen.getByRole("header");
    expect(header).toBeInTheDocument();
  });
});
