import React from 'react';

export default function UsersLoading() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="h-8 bg-base-300 rounded w-32"></div>
          <div className="h-4 bg-base-200 rounded w-48"></div>
        </div>
        <div className="h-9 bg-base-300 rounded w-28"></div>
      </div>

      <div className="bg-base-100 rounded-x1 p-4 border border-base-200 space-y-3">
        <div className="h-10 bg-base-200 rounded w-full"></div>
        <div className="h-12 bg-base-200/60 rounded w-full"></div>
        <div className="h-12 bg-base-200/60 rounded w-full"></div>
        <div className="h-12 bg-base-200/60 rounded w-full"></div>
        <div className="h-12 bg-base-200/60 rounded w-full"></div>
        <div className="h-12 bg-base-200/60 rounded w-full"></div>
      </div>
    </div>
  );
}
