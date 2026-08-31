'use client';
import React from 'react';
import AddToCart from './AddToCart';
import styles from './ProductCard.module.css';

const ProductCard = () => {
  return (
    <div className={`${styles.card} card bg-base-100 shadow-md max-w-sm rounded-xl p-4 my-4`}>
      <div className="card-body p-0">
        <h2 className="card-title text-lg font-bold">Featured Product</h2>
        <p className="text-sm text-base-content/70">
          High-performance item ready for instant delivery.
        </p>
        <div className="card-actions justify-end mt-4">
          <AddToCart />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

