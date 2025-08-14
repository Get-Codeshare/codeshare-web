import Head from "next/head";
import Link from "next/link";
import { ReactNode } from "react";
import { SciFiButton } from "./ui/scifi-button";
import ThemeToggle from "./ThemeToggle";
import { Wordmark } from "./Wordmark";

const Logo = () => (
  <div className="flex items-center gap-3">
    <span
      className="font-pixel text-2xl text-foreground leading-none"
      style={{ fontFamily: "'Press Start 2P', monospace" }}
    >
      C
    </span>
    <span
      className="text-xl text-foreground font-semibold tracking-wide"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      CODESHARE
    </span>
  </div>
);

const Header = () => (
  <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center">
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/docs"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Documentation
          </Link>
          <a
            href="https://github.com/Sarthakischill/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <ThemeToggle />
          <SciFiButton asChild size="sm">
            <a
              href="https://marketplace.visualstudio.com/items?itemName=Sarthakischill.codeshare-by-sarthak"
              target="_blank"
              rel="noopener noreferrer"
            >
              Install Extension
            </a>
          </SciFiButton>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggle />
          <button className="p-2 text-muted-foreground hover:text-foreground">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </header>
);

const Footer = () => (
  <footer className="bg-background border-t border-border pt-6">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-0">
      {/* Main Footer Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 max-w-6xl mx-auto">
        {/* Logo and Description */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <span
              className="font-pixel text-lg text-foreground leading-none"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              C
            </span>
            <span
              className="text-lg text-foreground font-semibold tracking-wide"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              CODESHARE
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
            Fast af code sharing experience.
          </p>
        </div>

        {/* Product Links */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-4">Product</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/docs"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Documentation
              </Link>
            </li>
            <li>
              <a
                href="https://marketplace.visualstudio.com/items?itemName=Sarthakischill.codeshare-by-sarthak"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                VS Code Extension
              </a>
            </li>
            <li>
              <a
                href="https://www.npmjs.com/package/get-codeshare"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                CLI Tool
              </a>
            </li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-4">Open Source</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="https://github.com/Sarthakischill/codeshare-project"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://github.com/Sarthakischill/codeshare-project/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Issues
              </a>
            </li>
            <li>
              <a
                href="https://github.com/Sarthakischill/codeshare-project/blob/main/CONTRIBUTING.md"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Contributing
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-4">Contact</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="https://github.com/Sarthakischill"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://x.com/Sarthakhuh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                X
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    {/* Magic SVG Wordmark - Positioned to show 70%, with 30% below page */}
    <div className="relative overflow-hidden border-t border-border">
      <div className="transform translate-y-[40%]">
        <Wordmark />
      </div>
    </div>
  </footer>
);

interface LayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
}

export default function Layout({ children, title, description }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <div className="min-h-screen bg-background relative transition-colors">
        <Header />
        <main className="flex-1 relative">{children}</main>
        <Footer />
      </div>
    </>
  );
}
