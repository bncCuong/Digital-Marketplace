/** @format */
'use client';
import { PRODUCT_CATEGORIES } from '@/config';
import React, { useEffect, useRef, useState } from 'react';
import NavItem from './NavItem';
import { useClickOutSide } from '@/hooks/useClickOutSide';

const NavItems = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);
  const navRef = useRef<HTMLDivElement | null>(null);
  useClickOutSide(navRef, () => setActiveIndex(null));
  useEffect(() => {
    const keydownHanler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveIndex(null);
    };

    document.addEventListener('keydown', keydownHanler);
    return () => document.removeEventListener('keydown', keydownHanler);
  }, []);
  return (
    <div ref={navRef} className="flex gap-4 h-full">
      {PRODUCT_CATEGORIES.map((category, i) => {
        const handleOpen = () => {
          activeIndex === i ? setActiveIndex(null) : setActiveIndex(i);
        };
        const isOpen = i === activeIndex;
        return (
          <NavItem
            key={category.label}
            category={category}
            handleOpen={handleOpen}
            isOpen={isOpen}
            isAnyOpen={activeIndex !== null}
          />
        );
      })}
    </div>
  );
};

export default NavItems;
