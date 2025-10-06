"use client";

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import DetailEditView from './DetailEditView';

export default function DetailEditPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const navigate = (path: string) => {
    router.push(path);
  };

  const showConfirm = (message: string, onConfirm: () => void) => {
    if (window.confirm(message)) {
      onConfirm();
    }
  };

  return (
    <DetailEditView
      id={id}
      navigate={navigate} 
      showConfirm={showConfirm}
    />
  );
}