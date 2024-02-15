import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import GeneralLayout from "../../layouts/general.layout";
import { IRegisterForm } from "../../pages/register/register.interface";

jest.mock("../../hooks/useAuth");

const mockCurrentUser: IRegisterForm = {
  username: "testuser",
  password: "testpassword",
  email: "test@example.com",
};

const mockUseNavigate = jest.fn();
const mockUseAuth = jest.mocked(useAuth);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUseNavigate,
}));

describe("GeneralLayout", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the layout correctly", () => {
    mockUseAuth.mockImplementation(() => ({
      currentUser: null,
      login: jest.fn(),
      logout: jest.fn(),
      register: jest.fn(),
    }));
    render(
      <MemoryRouter>
        <GeneralLayout />
      </MemoryRouter>
    );

    // Assert that the main container is rendered
    expect(screen.getByRole("main")).toBeInTheDocument();

    // Assert that the Outlet component is rendered
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  test("navigates to home if currentUser exists", () => {
    mockUseAuth.mockImplementation(() => ({
      currentUser: mockCurrentUser,
      login: jest.fn(),
      logout: jest.fn(),
      register: jest.fn(),
    }));

    render(
      <MemoryRouter initialEntries={["/test"]}>
        <GeneralLayout />
      </MemoryRouter>
    );

    // Assert that the navigate function is called with "/cart"
    expect(mockUseNavigate).toHaveBeenCalledWith("/");
  });
});
