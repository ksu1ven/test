import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <h2>404 page</h2>
      <Link to={"seacrh"}>Search page</Link>
    </div>
  );
};

export default NotFoundPage;
