import { capitalize } from "../../utils/capitalize";

describe("capitalize", () => {
  it("should capitalize the first letter of a word", () => {
    const result = capitalize("hello");
    expect(result).toBe("Hello");
  });

  it("should capitalize the first letter of each word in a sentence", () => {
    const result = capitalize("hello world");
    expect(result).toBe("Hello World");
  });

  it("should handle empty strings", () => {
    const result = capitalize("");
    expect(result).toBe("");
  });

  it("should handle strings with only whitespace", () => {
    const result = capitalize("   ");
    expect(result).toBe("   ");
  });

  it("should handle strings with special characters", () => {
    const result = capitalize("!@#$%^&*()");
    expect(result).toBe("!@#$%^&*()");
  });
});
