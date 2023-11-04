import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainPage from "./components/main-page";
import ErrorBoundary from "./components/error-boundary";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!window.location.search.includes("page")) {
      const path = !window.location.search
        ? "/?page=1"
        : `${window.location.search}&page=1`;
      navigate(path, { replace: true });
    }
  }, []);

  return (
    <ErrorBoundary>
      <MainPage />
    </ErrorBoundary>
  );
}

export default App;
