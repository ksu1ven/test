export interface PaginationProps {
  currentPage: number;
  pageSize: number;
  totalResults: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) => {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <div className="pagination">
      <button onClick={handlePrevPage}>Prev</button>
      <div>{currentPage}</div>
      <button onClick={handleNextPage}>Next</button>
      <select
        className="select"
        value={pageSize}
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </select>
    </div>
  );
};

export default Pagination;
