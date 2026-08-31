import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="hero min-h[50vh] bg-base-200 rounded-2xl">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-6xl font-extrabold text-primary">404</h1>
          <h2 className="text-2xl font-bold mt-2">Page Not Found</h2>
          <p className="py-4 text-base-content/70">
            The page you are looking for could not be found or does not exist.
          </p>
          <Link href="/" className="btn btn-primary">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
