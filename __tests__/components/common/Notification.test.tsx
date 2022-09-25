import { render, screen } from "@testing-library/react";
import Notification from "../../../components/common/Notification";
import "@testing-library/jest-dom";

describe("Notification component", () => {
  it("renders Notification", () => {
    render(<Notification>Error</Notification>);

    const notification = screen.getByText("Error");

    expect(notification).toBeInTheDocument();
    expect(notification).toHaveTextContent("Error");
  });
  it("renders empty Notification", () => {
    render(<Notification>{}</Notification>);

    const notification = screen.getByRole("heading");

    expect(notification).toBeInTheDocument();
    expect(notification).toHaveTextContent("");
  });
});
