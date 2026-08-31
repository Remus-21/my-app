import React from 'react';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h[50vh] gap-3">
      <span className="loading loading-spinner loading-lg text-primary"></span>
      <p className="text-sm font-medium text-base-content/70">Loading content...</p>
    </div>
  );
}
