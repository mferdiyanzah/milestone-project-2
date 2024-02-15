import { renderHook } from "@testing-library/react-hooks";
import useAuth from "../../hooks/useAuth";
import { hashSync } from "bcryptjs";

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

  test("should login with valid credentials", () => {
    localStorage.setItem("users", JSON.stringify(userListMock));

    const { result } = renderHook(() => useAuth());

    const newUser = {
      username: "testuser",
      password: "testpassword",
    };

    result.current.register(newUser);

    const loginResult = result.current.login({
      username: "testuser",
      password: "testpassword",
    });

    expect(loginResult).toBe(true);
    expect(result.current.currentUser).toEqual(userListMock[0]);
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
});
