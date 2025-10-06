"use client";

import React from 'react';

import { useRouter } from 'next/navigation';
import HomeView from './item/HomeView';

export default function HomePage() {
  const router = useRouter();

  const navigate = (path: string) => {
    router.push(path);
  };
  const showConfirm = (message: string, onConfirm: () => void) => {
    if (typeof window !== 'undefined') {
    if (window.confirm(message)) {
      onConfirm();
    }
    }
  };

  return (
    <HomeView
      navigate={navigate} 
      showConfirm={showConfirm}
    />
  );
}