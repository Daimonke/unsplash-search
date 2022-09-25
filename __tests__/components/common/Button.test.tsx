import { render, screen } from "@testing-library/react";
import Button from "../../../components/common/Button";
import "@testing-library/jest-dom";

describe("Button component", () => {
  it("renders empty button", () => {
    render(<Button />);

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("");
  });
  it("renders button with text 'Press me'", () => {
    render(<Button>Press me</Button>);

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Press me");
  });
});
