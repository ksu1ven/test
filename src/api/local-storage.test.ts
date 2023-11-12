import { setLocalStorageItem, getLocalStorageItem } from "./local-storage";

const mockGetItem = jest.fn();
const mockSetItem = jest.fn();

beforeAll(() => {
  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: (...args: string[]) => mockGetItem(...args),
      setItem: (...args: string[]) => mockSetItem(...args),
    },
  });
});

it("should set an item in localStorage", () => {
  setLocalStorageItem("testKey", "testValue");
  expect(mockSetItem).toHaveBeenCalledWith("testKey", "testValue");
});

it("should get an item from localStorage", () => {
  getLocalStorageItem("testKey");
  expect(mockGetItem).toHaveBeenCalledWith("testKey");
});
