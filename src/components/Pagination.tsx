import React from 'react';
import './pagination.css';

interface State {}

interface Props {}

export class Pagination extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div className="pagination">
        <button>prev</button>
        <p className="page">1</p>
        <button>next</button>
      </div>
    );
  }
}
