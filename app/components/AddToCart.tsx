'use client';
import React from 'react';
import { useCart } from '../context/CartContext';

const AddToCart = () => {
  const { addToCart } = useCart();

  const handleClick = () => {
    console.log('Click');
    addToCart();
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={handleClick}>
        Add to Cart
      </button>
    </div>
  );
};

export default AddToCart;

