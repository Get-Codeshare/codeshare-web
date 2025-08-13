import Head from 'next/head';
import { Geist } from 'next/font/google';
import { ReactNode } from 'react';

// Define and export the font so we only do it once
export const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

interface LayoutProps {
  children: ReactNode;
  title: string;
  description: string;
}

export default function Layout({ children, title, description }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`${geistSans.className} bg-black text-white antialiased`}>
        <div className="container mx-auto px-4">
          <main className="min-h-screen flex flex-col items-center justify-center text-center py-10 md:py-20">
            {children}
          </main>
          
          <footer className="text-center py-10 border-t border-neutral-800">
            <p className="text-neutral-500">
              A project by{' '}
              <a
                href="https://github.com/Sarthakischill"
                className="underline hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                Sarthak
              </a>
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}