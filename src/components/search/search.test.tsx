import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Search from ".";

describe("Search", () => {
  const mockSearch = {
    inputValue: "",
    onInputChange: jest.fn(),
    submitSearch: jest.fn(),
  };
  it("should render search", () => {
    render(
      <Search
        inputValue={mockSearch.inputValue}
        onInputChange={mockSearch.onInputChange}
        submitSearch={mockSearch.submitSearch}
      />,
    );

    expect(screen.getByText("Search by name:")).toBeInTheDocument();
  });

  it("should submit search", () => {
    render(
      <Search
        inputValue={mockSearch.inputValue}
        onInputChange={mockSearch.onInputChange}
        submitSearch={mockSearch.submitSearch}
      />,
    );

    const button = screen.getByText(/submit/i);
    fireEvent.click(button);

    expect(mockSearch.submitSearch).toHaveBeenCalledTimes(1);
  });
});
