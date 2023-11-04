import classNames from "classnames";
import React from "react";

interface Props {
  currentPage: number;
  totalCount: number;
  pageLimit: number;
  setPage: (page: number) => void;
}

const Pagination = ({ currentPage, totalCount, pageLimit, setPage }: Props) => {
  if (currentPage === 0) {
    return null;
  }

  const pageCount = Math.ceil(totalCount / pageLimit);
  const pageNumbers = [...Array(pageCount + 1).keys()].slice(1);

  return (
    <ul className="pagination-list">
      {pageNumbers.map((pageNumber) => (
        <li
          key={pageNumber}
          className={classNames("pagination-item", {
            ["active"]: currentPage === pageNumber,
          })}
          onClick={() => setPage(pageNumber)}
        >
          {pageNumber}
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
