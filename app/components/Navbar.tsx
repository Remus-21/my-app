'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cartCount, clearCart } = useCart();

  return (
    <nav className="navbar bg-base-100 border-b border-base-200 px-4 mb-6 shadow-sm rounded-box">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl font-bold tracking-wide text-primary">
          NextApp
        </Link>
        <div className="hidden sm:flex gap-1 ml-4">
          <Link href="/" className="btn btn-ghost btn-sm">
            Home
          </Link>
          <Link href="/users" className="btn btn-ghost btn-sm">
            Users
          </Link>
          <Link href="/users/new" className="btn btn-ghost btn-sm">
            New User
          </Link>
        </div>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="badge badge-sm badge-primary indicator-item">
                  {cartCount}
                </span>
              )}
            </div>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-100 z-30 mt-3 w-52 shadow-lg border border-base-200"
          >
            <div className="card-body">
              <span className="text-lg font-bold">{cartCount} Items in Cart</span>
              <span className="text-info text-sm">
                {cartCount > 0 ? `${cartCount} item(s) added` : 'Your cart is empty'}
              </span>
              <div className="card-actions mt-2">
                {cartCount > 0 && (
                  <button
                    className="btn btn-outline btn-error btn-sm btn-block"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

