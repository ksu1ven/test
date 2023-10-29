import React from "react";

export class Loader extends React.Component {
  render(): React.ReactNode {
    return (
      <div className="spinner-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }
}
