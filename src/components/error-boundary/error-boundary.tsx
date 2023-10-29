import React, { ReactNode } from "react";

interface State {
  hasError: boolean;
  errorMessage: string;
}

interface Props {
  children: ReactNode;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  componentDidCatch(error: Error): void {
    console.log(error);
    this.setState({ hasError: true, errorMessage: error.message });
  }

  render() {
    if (this.state.hasError) {
      return (
        <h1>
          Something wrong. Error Message: {this.state.errorMessage}. Restart app
        </h1>
      );
    }

    return this.props.children;
  }
}
