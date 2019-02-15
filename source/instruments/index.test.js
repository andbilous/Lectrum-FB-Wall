import { sum, delay, getUniqueID, getFullApiUrl } from "./";
jest.setTimeout(10000);

describe("instruments", () => {
  test("sum function should be a function", () => {
    expect(sum).toBeInstanceOf(Function);
  });

  test("sum function should throw, when called with non-number type as second argument", () => {
    expect(() => sum(2, "привет")).toThrow();
  });

  test("sum function should throw, when called with non-number type as first argument", () => {
    expect(() => sum("привет", 2)).toThrow();
  });
  test("sum function should return an addition of two arguments", () => {
    expect(sum(2, 3)).toBe(5);
    expect(sum(1, 8)).toMatchSnapshot();
  });
  test("delay function should return Object, when called without arguments", () => {
    expect(delay()).toBeInstanceOf(Object);
  });

  test("delay function should return a resolved promise", async () => {
    await expect(delay(1000)).resolves.toBe("A resolved promise");
  });

  test("getUniqueID function should be a function", () => {
    expect(getUniqueID).toBeInstanceOf(Function);
  });
  test("getUniqueID function should throw when called with non-number argument", () => {
    expect(() => getUniqueID("привет")).toThrow();
  });
  test("getUniqueID function should produce a string of a desired given argument", () => {
    expect(typeof getUniqueID()).toBe("string");
    expect(getUniqueID(5)).toHaveLength(5);
    expect(getUniqueID(13)).toHaveLength(13);
  });

  test("getFullApiUrl function should throw when called with non-string argument", () => {
    expect(() => getFullApiUrl(1)).toThrow();
  });
  test("getFullApiUrl function should return string url that contains given arguments", () => {
    expect(getFullApiUrl("1", "2")).toBe("1/2");
  });
});
