import { render } from "@testing-library/react";
import { photosCtx } from "../context/PhotosCtx";

// custom test renderer to use Context
const customRender = (
  ui: React.ReactNode,
  { providerProps, ...renderOptions }: any
) => {
  return render(
    <photosCtx.Provider value={providerProps}>{ui}</photosCtx.Provider>,
    renderOptions
  );
};

export default customRender;
