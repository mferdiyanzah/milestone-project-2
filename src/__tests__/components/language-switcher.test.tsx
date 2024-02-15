import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../../components/language-switcher";

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn(),
}));
describe("LanguageSwitcher", () => {
  const changeLanguageSpy = jest.fn(() => new Promise(() => {}));
  const useTranslationSpy = useTranslation as jest.Mock;

  test("changes the language to ID when switched on", async () => {
    useTranslationSpy.mockReturnValue({
      t: jest.fn(),
      i18n: { changeLanguage: changeLanguageSpy, language: "en" },
    });

    render(<LanguageSwitcher />);

    const switchComponent = screen.getByRole("switch");
    fireEvent.click(switchComponent);
    await act(async () => {});
    expect(changeLanguageSpy).toHaveBeenCalledWith("id");

    fireEvent.click(switchComponent);
    await act(async () => {});
    expect(changeLanguageSpy).toHaveBeenCalledWith("en");
  });
});
