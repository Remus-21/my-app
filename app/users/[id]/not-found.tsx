import React from 'react';
import Link from 'next/link';

export default function UserNotFound() {
  return (
    <div className="hero min-h[50vh] bg-base-200 rounded-2xl">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold text-error">404</h1>
          <h2 className="text-2xl font-semibold mt-2">User Not Found</h2>
          <p className="py-4 text-base-content/70">
            The user you are looking for does not exist or may have been removed.
          </p>
          <Link href="/users" className="btn btn-primary">
            Back to Users List
          </Link>
        </div>
      </div>
    </div>
  );
}
