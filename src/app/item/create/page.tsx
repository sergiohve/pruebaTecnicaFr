"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import CreateView from './CreateView';

export default function CreatePage() {
  const router = useRouter();

  const navigate = (path: string) => {
    router.push(path);
  };

  return (
    <CreateView
      navigate={navigate}
    />
  );
}