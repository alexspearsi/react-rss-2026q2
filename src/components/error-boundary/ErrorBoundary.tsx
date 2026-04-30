import { Component, type ErrorInfo } from 'react';
import styles from './ErrorBoundary.module.css';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Ooopss.. error', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.container}>
          <p className={styles.message}>Something went wrong</p>
          <a className={styles.hint} onClick={() => window.location.reload()}>
            Click to reload the page
          </a>
        </div>
      );
    }

    return this.props.children;
  }
}
