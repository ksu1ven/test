import React from "react";
import MainPage from "./components/main-page";
import ErrorBoundary from "./components/error-boundary";

class App extends React.Component {
  render() {
    return (
      <ErrorBoundary>
        <MainPage />
      </ErrorBoundary>
    );
  }
}

export default App;
