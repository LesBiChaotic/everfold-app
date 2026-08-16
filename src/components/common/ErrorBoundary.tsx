import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Everfold Runtime Error:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (e) {
      console.error('Error clearing storage:', e);
    }
    window.location.href = window.location.origin + window.location.pathname;
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '24px',
            backgroundColor: 'var(--bg-app, #faf7f2)',
            color: 'var(--text-primary, #231722)',
            fontFamily: 'var(--font-family-base, sans-serif)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              maxWidth: '460px',
              width: '100%',
              backgroundColor: 'var(--bg-surface, #ffffff)',
              padding: '32px 24px',
              borderRadius: '16px',
              border: '1px solid var(--border-subtle, #e8e1d7)',
              boxShadow: '0 8px 24px rgba(35, 23, 34, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-surface, #f7eef3)',
                color: 'var(--accent-plum, #6b2848)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                fontWeight: 800,
              }}
            >
              ✦
            </div>

            <h1 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
              Everfold is Refreshing
            </h1>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary, #544451)', margin: 0, lineHeight: 1.5 }}>
              A cached data mismatch was detected on your device. Tap below to clear the local cache and reload fresh data.
            </p>

            <button
              onClick={this.handleReset}
              style={{
                marginTop: '8px',
                backgroundColor: 'var(--accent-plum, #6b2848)',
                color: '#ffffff',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '9999px',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              Reset Cache & Reload App
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
