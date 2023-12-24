/** @format */
'use client';
import React, { useEffect, useState } from 'react';
import { Product } from '@/payload-types';
import { Button } from './ui/button';
import { useCart } from '@/hooks/useCart';

const AddtoCartButton = ({ product }: { product: Product }) => {
  const [isSuccess, setIsSuccsess] = useState<boolean>(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccsess(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [isSuccess]);

  const { addItem } = useCart();
  return (
    <Button
      onClick={() => {
        addItem(product);
        setIsSuccsess(true);
      }}
      size="lg"
      className="w-full"
    >
      {isSuccess ? 'Added to cart' : 'Add to cart'}
    </Button>
  );
};

export default AddtoCartButton;
