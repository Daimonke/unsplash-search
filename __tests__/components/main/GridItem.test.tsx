import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import GridItem from "../../../components/main/GridItem";

describe("GridItem component", () => {
  it("renders GridItem", () => {
    const item = {
      urls: {
        regular: "https://picsum.photos/id/237/200/300",
        thumb: "https://picsum.photos/id/237/200/300",
      },
      desciption: "Test image",
    };
    render(<GridItem item={item as any} />);
    const img = screen.getByRole("img");
    expect(img).toBeInTheDocument();
  });
});
