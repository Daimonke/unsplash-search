import { render, screen, fireEvent } from "@testing-library/react";
import Input from "../../../components/common/Input";
import "@testing-library/jest-dom";

describe("Input component", () => {
  it("renders input", () => {
    render(<Input placeholder="test" type="text" />);

    const input = screen.getByPlaceholderText("test");

    expect(input).toBeInTheDocument();
    expect(input).toHaveTextContent("");
  });
  it("changes value", () => {
    render(<Input placeholder="test" type="text" />);
    const input = screen.getByPlaceholderText("test");
    fireEvent.change(input, { target: { value: "dogs" } });
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("dogs");
  });
});
