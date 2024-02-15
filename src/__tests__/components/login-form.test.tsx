import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import LoginForm from "../../components/login-form";
import { BrowserRouter } from "react-router-dom";
import { hashSync } from "bcryptjs";
import { act } from "react-dom/test-utils";

const password = "testpassword";
const hashedPassword = hashSync("testpassword", 10);

const userListMock = [
  {
    username: "testuser",
    password: hashedPassword,
  },
];

describe("LoginForm", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const renderComponent = () =>
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );

  test("renders the form correctly", () => {
    renderComponent();

    // Assert that the form inputs are rendered
    expect(screen.getByLabelText("username")).toBeInTheDocument();
    expect(screen.getByLabelText("password")).toBeInTheDocument();

    // Assert that the Login button is rendered
    expect(screen.getByText("login")).toBeInTheDocument();
  });

  test("disables the Login button when form is empty", () => {
    renderComponent();

    // Assert that the Login button is initially disabled
    expect(screen.getByText("login")).toBeDisabled();
  });

  test("enables the Login button when form is filled", async () => {
    renderComponent();

    // Fill in the form inputs
    fireEvent.change(screen.getByLabelText("username"), {
      target: { value: "john.doe" },
    });
    await waitFor(() => {
      expect(screen.getByLabelText("username")).toHaveValue("john.doe");
    });

    fireEvent.change(screen.getByLabelText("password"), {
      target: { value: "password123" },
    });
    await waitFor(() => {
      expect(screen.getByLabelText("password")).toHaveValue("password123");
    });

    // Assert that the Login button is enabled
    expect(screen.getByText("login")).toBeEnabled();
  });

  test("display success message and redirect to home page when login is successful", async () => {
    localStorage.setItem("users", JSON.stringify(userListMock));

    renderComponent();

    // Fill in the form inputs
    fireEvent.change(screen.getByLabelText("username"), {
      target: { value: "testuser" },
    });
    await waitFor(() => {
      expect(screen.getByLabelText("username")).toHaveValue("testuser");
    });

    fireEvent.change(screen.getByLabelText("password"), {
      target: { value: password },
    });
    await waitFor(() => {
      expect(screen.getByLabelText("password")).toHaveValue(password);
    });

    // Click the Login button
    fireEvent.click(screen.getByText("login"));
    await act(async () => {});

    expect(screen.getByText("loginSuccess")).toBeInTheDocument();
  });

  test("display error message when login is unsuccessful", async () => {
    localStorage.setItem("users", JSON.stringify(userListMock));

    renderComponent();

    // Fill in the form inputs
    fireEvent.change(screen.getByLabelText("username"), {
      target: { value: "testuser" },
    });
    await waitFor(() => {
      expect(screen.getByLabelText("username")).toHaveValue("testuser");
    });

    fireEvent.change(screen.getByLabelText("password"), {
      target: { value: "wrongpassword" },
    });
    await waitFor(() => {
      expect(screen.getByLabelText("password")).toHaveValue("wrongpassword");
    });

    // Click the Login button
    fireEvent.click(screen.getByText("login"));
    await act(async () => {});

    expect(screen.getByText("loginError")).toBeInTheDocument();
  });
});
