import { renderHook } from "@testing-library/react-hooks";
import useAuth from "../../hooks/useAuth";

describe("useAuth", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("should initialize with null currentUser", () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.currentUser).toBeNull();
  });

  test("should login with valid credentials", () => {
    const { result } = renderHook(() => useAuth());

    const newUser = {
      username: "testuser",
      password: "testpassword",
      email: "test@example.com",
    };

    result.current.register(newUser);

    const loginResult = result.current.login({
      username: "testuser",
      password: "testpassword",
    });

    expect(loginResult).toBe(true);
    expect(result.current.currentUser).toEqual(newUser);
  });

  test("should not login with invalid credentials", () => {
    const { result } = renderHook(() => useAuth());

    const newUser = {
      username: "testuser",
      password: "testpassword",
      email: "test@example.com",
    };

    result.current.register(newUser);

    const loginResult = result.current.login({
      username: "testuser",
      password: "wrongpassword",
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

    result.current.register(newUser);
    result.current.login({
      username: "testuser",
      password: "testpassword",
    });

    result.current.logout();

    expect(result.current.currentUser).toBeNull();
  });

  test("should register a new user", () => {
    const { result } = renderHook(() => useAuth());

    const newUser = {
      username: "testuser",
      password: "testpassword",
      email: "test@example.com",
    };

    const registerResult = result.current.register(newUser);

    expect(registerResult).toBe(true);
  });

  test("should not register an existing user", () => {
    const { result } = renderHook(() => useAuth());

    const newUser = {
      username: "testuser",
      password: "testpassword",
      email: "test@example.com",
    };

    result.current.register(newUser);

    const existingUser = {
      username: "testuser",
      password: "newpassword",
      email: "test@example.com",
    };

    const registerResult = result.current.register(existingUser);

    expect(registerResult).toBe(false);
    expect(result.current.currentUser).toBeNull();
  });
});
