import Head from 'next/head';
import Link from 'next/link';
import { ReactNode } from 'react';
import GridBackground from './GridBackground';

const Logo = () => (
  <div className="flex items-center gap-6 translate-y-1">
    <span 
      className="text-2xl text-black leading-none" 
      style={{ fontFamily: "'Press Start 2P', monospace" }}
    >
      C
    </span>
    <span className="font-audiowide text-xl tracking-wider leading-none">CODESHARE</span>
  </div>
);

const Header = () => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm">
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between h-16 border-b border-neutral-200">
        <Link href="/" className="text-lg font-bold">
          <Logo />
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-600">
          <a href="https://github.com/Sarthakischill/codeshare-project/blob/main/README.md" target="_blank" rel="noopener noreferrer" className="hover:text-black">Docs</a>
          <a href="https://github.com/Sarthakischill/codeshare-project" target="_blank" rel="noopener noreferrer" className="hover:text-black">GitHub</a>
          <a
            href="https://marketplace.visualstudio.com/items?itemName=Sarthakischill.codeshare-by-sarthak"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white font-semibold py-2 px-4 rounded-lg hover:bg-neutral-800 transition-colors"
          >
            Install for VS Code
          </a>
        </nav>
      </div>
    </div>
  </header>
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
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>

      <div className="relative bg-white text-black antialiased font-sans">
        <GridBackground />
        <Header />
        <main className="pt-16">
          {children}
        </main>
        <footer className="text-center py-10 border-t border-neutral-200 bg-white">
          <div className="container mx-auto px-4">
            <p className="text-neutral-500 text-sm">
              A project by{' '}
              <a href="https://github.com/Sarthakischill" className="underline hover:text-black" target="_blank" rel="noopener noreferrer">
                Sarthak
              </a>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}