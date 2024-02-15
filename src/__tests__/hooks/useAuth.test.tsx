import { renderHook } from "@testing-library/react";
import useAuth from "../../hooks/useAuth";
import { hashSync } from "bcryptjs";
import { act } from "react-dom/test-utils";

const hashedPassword = hashSync("testpassword", 10);

const userListMock = [
  {
    username: "testuser",
    password: hashedPassword,
  },
];

describe("useAuth", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("should initialize with null currentUser", () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.currentUser).toBeNull();
  });

  test("should login with valid credentials", async () => {
    localStorage.setItem("users", JSON.stringify(userListMock));

    const { result } = renderHook(() => useAuth());

    let loginResult;
    act(() => {
      loginResult = result.current.login({
        username: "testuser",
        password: "testpassword",
      });
    });

    expect(loginResult).toBe(true);
  });

  test("should not login with invalid credentials", async () => {
    const { result } = renderHook(() => useAuth());

    const newUser = {
      username: "testuser",
      password: "testpassword",
      email: "test@example.com",
    };

    act(() => {
      result.current.register(newUser);
    });

    let loginResult;

    act(() => {
      loginResult = result.current.login({
        username: "testuser",
        password: "wrongpassword",
      });
    });

    expect(loginResult).toBe(false);
    expect(result.current.currentUser).toBeNull();
  });

  test("should logout successfully", () => {
    const { result } = renderHook(() => useAuth());

    const newUser = {
      username: "testuser",
      password: "testpassword",
      email: "test@example.com",
    };

    act(() => {
      result.current.register(newUser);
    });

    act(() => {
      result.current.login({
        username: "testuser",
        password: "testpassword",
      });
    });

    act(() => {
      result.current.logout();
    });

    expect(result.current.currentUser).toBeNull();
  });

  test("should register a new user", () => {
    const { result } = renderHook(() => useAuth());

    const newUser = {
      username: "testuser",
      password: "testpassword",
      email: "test@example.com",
    };

    let registerResult;
    act(() => {
      registerResult = result.current.register(newUser);
    });

    expect(registerResult).toBe(true);
  });
});
