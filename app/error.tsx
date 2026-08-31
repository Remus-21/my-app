'use client';

import React, { useEffect } from 'react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Captured application error:', error);
  }, [error]);

  return (
    <div className="hero min-h-[50vh] bg-base-200 rounded-2xl p-6">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <div className="badge badge-error badge-lg mb-3">Application Error</div>
          <h1 className="text-3xl font-bold">Something went wrong!</h1>
          <p className="py-4 text-sm text-base-content/70">
            {error.message || 'An unexpected error occurred while loading this view.'}
          </p>
          <button className="btn btn-primary" onClick={() => reset()}>
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}

