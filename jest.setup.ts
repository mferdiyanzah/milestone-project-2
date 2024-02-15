import "@testing-library/jest-dom";

jest.mock("react-i18next", () => ({
  //eslint-disable-next-line
  useTranslation: () => ({ t: (key: any) => key }),
}));

HTMLCanvasElement.prototype.getContext = jest.fn();

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
