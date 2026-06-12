import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    // Log to console/observability service
    console.error('ErrorBoundary caught an unhandled exception:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      const requestId = this.state.error?.requestId || null;

      return (
        <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-white border border-neutral-150 rounded-[2.5rem] p-8 md:p-10 shadow-lg shadow-neutral-100/30 flex flex-col items-center">
            <div className="w-16 h-16 bg-red-50 border border-red-100 rounded-2xl flex items-center justify-center text-red-600 mb-6 animate-pulse">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <h1 className="font-poppins font-bold text-text-primary text-xl md:text-2xl mb-2">
              Something went wrong
            </h1>
            <p className="text-text-secondary text-sm font-inter mb-6 leading-relaxed">
              An unexpected error occurred. We have recorded this issue and our team is looking into it.
            </p>

            {requestId && (
              <div className="w-full bg-neutral-50 rounded-xl p-3 border border-neutral-100 text-left font-mono text-[10px] text-text-muted mb-6 break-all">
                <span className="font-bold text-text-secondary">Request ID:</span> {requestId}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <button
                onClick={this.handleReset}
                className="flex-1 flex items-center justify-center gap-2 bg-brand-900 hover:bg-brand-950 text-white font-poppins font-bold text-sm py-3 px-4 rounded-xl shadow-md transition-all active:scale-98 cursor-pointer select-none"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reload Page</span>
              </button>
              
              <a
                href="/"
                className="flex-1 flex items-center justify-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-text-primary font-poppins font-bold text-sm py-3 px-4 rounded-xl border border-neutral-200/40 transition-all active:scale-98 cursor-pointer select-none"
              >
                <Home className="w-4 h-4" />
                <span>Go Home</span>
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
