import './pagination.css';

interface Props {
  currentPage: string;
  isNext: boolean;
  isPrev: boolean;
  getPrevPage: () => void;
  getNextPage: () => void;
  count: number;
  isLoaded: boolean;
}

export function Pagination(props: Props) {
  console.log(props);

  return (
    <div className="pagination">
      <button disabled={props.isPrev} onClick={props.getPrevPage}>
        prev page
      </button>
      {props.isLoaded ? (
        <p className="loading">loading...</p>
      ) : (
        <p className="page">
          Page: {props.currentPage} from {Math.ceil(props.count / 10)}
        </p>
      )}
      <button disabled={props.isNext} onClick={props.getNextPage}>
        next page
      </button>
    </div>
  );
}
