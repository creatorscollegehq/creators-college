'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const Studio = dynamic(() => import('./Studio'), { ssr: false });

export default function StudioPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div suppressHydrationWarning>
      <Studio />
    </div>
  );
}
