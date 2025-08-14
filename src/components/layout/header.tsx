'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { SciFiButton } from '@/components/ui/scifi-button';

export default function Header() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="font-bold text-xl text-foreground">
            Code<span className="text-accent">share</span>
          </h1>
        </div>

        {/* Navigation */}
        <nav className="hidden items-center space-x-6 md:flex">
          <a
            href="#features"
            className="text-muted-foreground text-sm transition-colors hover:text-foreground"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-muted-foreground text-sm transition-colors hover:text-foreground"
          >
            How it works
          </a>
          <a
            href="https://github.com/sarthakroy107/codeshare"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground text-sm transition-colors hover:text-foreground"
          >
            GitHub
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded border border-border bg-transparent text-foreground transition-colors hover:bg-muted"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </button>

          {/* Install Button */}
          <SciFiButton
            onClick={() => window.open(
              'https://marketplace.visualstudio.com/items?itemName=Sarthakischill.codeshare-by-sarthak',
              '_blank',
              'noopener,noreferrer'
            )}
            size="sm"
          >
            Install
          </SciFiButton>
        </div>
      </div>
    </header>
  );
}