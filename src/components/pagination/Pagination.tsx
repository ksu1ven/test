import { useContext } from 'react';
import './pagination.css';
import { CustomContext } from '../../context';

export function Pagination() {
  const { page, setPage, data } = useContext(CustomContext);

  function getPrevPage() {
    if (data?.previous) {
      const page = data.previous.split('page=')[1];
      console.log(page);
      setPage(page);
    }
  }

  function getNextPage() {
    if (data?.next) {
      const page = data.next.split('page=')[1];
      setPage(page);
    }
  }

  return (
    <>
      {data && (
        <div className="pagination">
          <button disabled={!data.previous} onClick={getPrevPage}>
            prev page
          </button>
          <p className="page">
            Page: {page} from {Math.ceil(data.count / 10)}
          </p>
          <button disabled={!data.next} onClick={getNextPage}>
            next page
          </button>
        </div>
      )}
    </>
  );
}
