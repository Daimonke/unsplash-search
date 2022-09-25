import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import PhotosProvider from "../../context/PhotosCtx";

describe("PhotosCtx component", () => {
  it("renders PhotosCtx", () => {
    render(
      <PhotosProvider>
        <h1>Hello world</h1>
      </PhotosProvider>
    );
    const h1 = screen.getByRole("heading");
    expect(h1).toHaveTextContent("Hello world");
  });
});
