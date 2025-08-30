'use client';

import { ThemeProvider } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeProviderWithClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid rendering until mounted to prevent hydration mismatch
  if (!mounted) return null;

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
