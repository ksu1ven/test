import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Pagination from ".";

describe("Pagination", () => {
  const mockProps = {
    currentPage: 1,
    totalCount: 1,
    pageLimit: 1,
    setPage: jest.fn(),
  };

  it("should create pagination", () => {
    render(
      <Pagination
        currentPage={mockProps.currentPage}
        totalCount={mockProps.totalCount}
        pageLimit={mockProps.pageLimit}
        setPage={mockProps.setPage}
      />,
    );

    expect(screen.getByText(/1/i)).toBeInTheDocument();
  });

  it("should return null when page is 0", () => {
    const { container } = render(
      <Pagination
        currentPage={0}
        totalCount={mockProps.totalCount}
        pageLimit={mockProps.pageLimit}
        setPage={mockProps.setPage}
      />,
    );

    expect(container.firstChild).toBeNull();
  });

  it("should click pagination item", () => {
    render(
      <Pagination
        currentPage={mockProps.currentPage}
        totalCount={mockProps.totalCount}
        pageLimit={mockProps.pageLimit}
        setPage={mockProps.setPage}
      />,
    );

    const paginationItem = screen.getByText(/1/i);
    paginationItem.click();

    expect(mockProps.setPage).toHaveBeenCalledWith(1);
  });
});
