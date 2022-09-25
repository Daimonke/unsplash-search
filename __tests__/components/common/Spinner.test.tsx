import { render, screen } from "@testing-library/react";
import Spinner from "../../../components/common/Spinner";
import "@testing-library/jest-dom";

describe("Spinner component", () => {
  it("renders Spinner", () => {
    render(<Spinner />);

    const spinner = screen.getByRole("status");
    expect(spinner).toBeInTheDocument();
  });
});
