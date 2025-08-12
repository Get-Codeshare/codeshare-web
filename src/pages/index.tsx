import { Geist } from "next/font/google";
import Head from 'next/head';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Codeshare - Share Code, Instantly</title>
        <meta name="description" content="Generate universal links to specific lines of code that work for everyone, everywhere. Seamlessly integrates with VS Code and provides a beautiful web fallback." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`${geistSans.className} font-sans bg-[#1a1a1a] text-white min-h-screen flex flex-col items-center justify-center p-4`}
      >
        <main className="flex flex-col items-center justify-center text-center max-w-4xl w-full flex-grow pt-16 sm:pt-20">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
            Share Code, Instantly.
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8">
            Generate universal links to specific lines of code that work for everyone, everywhere. Seamlessly integrates with VS Code and provides a beautiful web fallback.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <a
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
              href="https://marketplace.visualstudio.com/items?itemName=Sarthakischill.codeshare-by-sarthak"
              target="_blank"
              rel="noopener noreferrer"
            >
              Install for VS Code
            </a>
            <a
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
              href="https://github.com/Sarthakischill/codeshare-web"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </a>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">🔗 Universal Links</h3>
              <p className="text-gray-400">
                One link works for teammates with the extension and provides a read-only view for everyone else in their browser.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">⚡ IDE Integration</h3>
              <p className="text-gray-400">
                Links open directly in your VS Code editor, highlighting the exact lines of code, right where you need them.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">💻 CLI Support</h3>
              <p className="text-gray-400">
                A powerful command-line interface for developers who live in the terminal. Generate links without leaving your workflow.
              </p>
            </div>
          </div>
        </main>
        <footer className="w-full text-center p-4 text-gray-500 mt-auto">
          <p>
            A project by <a href="https://github.com/Sarthakischill" className="underline hover:text-white" target="_blank" rel="noopener noreferrer">Sarthak</a>.
          </p>
        </footer>
      </div>
    </>
  );
}