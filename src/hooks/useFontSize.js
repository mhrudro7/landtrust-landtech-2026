import { useState, useEffect } from 'react';

export function useFontSize() {
  const [fontSize, setFontSize] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('land_font_size') || 'normal';
    }
    return 'normal';
  });

  useEffect(() => {
    localStorage.setItem('land_font_size', fontSize);
    const root = document.documentElement;
    root.classList.remove('font-size-normal', 'font-size-large', 'font-size-extra-large');
    root.classList.add(`font-size-${fontSize}`);
  }, [fontSize]);

  const cycleFontSize = () => {
    if (fontSize === 'normal') setFontSize('large');
    else if (fontSize === 'large') setFontSize('extra-large');
    else setFontSize('normal');
  };

  const getLabel = () => {
    if (fontSize === 'normal') return 'হরফ: স্বাভাবিক';
    if (fontSize === 'large') return 'হরফ: বড়';
    return 'হরফ: সবচেয়ে বড়';
  };

  return {
    fontSize,
    setFontSize,
    cycleFontSize,
    getLabel,
  };
}
