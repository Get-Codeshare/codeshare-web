import { Geist } from 'next/font/google';
import Head from 'next/head';

// Define the font
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

// --- Helper Components for Icons ---
// Using inline SVG components is clean, fast, and avoids extra dependencies.

const LinkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 mb-4 text-blue-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
    />
  </svg>
);

const CodeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 mb-4 text-blue-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

const TerminalIcon = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-8 w-8 mb-4 text-blue-400"
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
        strokeWidth={2}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
    </svg>
);


// --- The Main Landing Page Component ---

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Codeshare - The Missing Link for Your Code</title>
        <meta
          name="description"
          content="Generate universal links to specific lines of code that open in VS Code for teammates and in the browser for everyone else."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`${geistSans.className} bg-black text-white antialiased`}>
        <div className="container mx-auto px-4">
          
          {/* --- Hero Section --- */}
          <section className="min-h-screen flex flex-col items-center justify-center text-center py-20">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-neutral-100 to-neutral-400 pb-2">
              The Missing Link for Your Code.
            </h1>
            <p className="max-w-3xl mt-4 text-lg md:text-xl text-neutral-400">
              Generate universal links to specific lines of code. They open in VS Code for teammates and in the browser for everyone else.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="https://marketplace.visualstudio.com/items?itemName=Sarthakischill.codeshare-by-sarthak"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Install for VS Code
              </a>
              <a
                href="https://github.com/Sarthakischill/codeshare-project"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-neutral-800 text-neutral-300 font-semibold py-3 px-8 rounded-lg hover:bg-neutral-700 border border-neutral-700 transition-colors duration-200"
              >
                View on GitHub
              </a>
            </div>
          </section>

          {/* --- Features Section --- */}
          <section className="py-20 max-w-5xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold tracking-tight">One Tool, Every Workflow.</h2>
                <p className="text-neutral-400 mt-2">A seamless experience, from your IDE to the browser.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="bg-neutral-900/50 p-8 rounded-xl border border-neutral-800">
                <LinkIcon />
                <h3 className="text-xl font-semibold mb-2">Universal Links</h3>
                <p className="text-neutral-400">
                  One link works everywhere. Teammates with the extension go straight to their IDE. Everyone else gets a beautiful, read-only web view.
                </p>
              </div>
              <div className="bg-neutral-900/50 p-8 rounded-xl border border-neutral-800">
                <CodeIcon />
                <h3 className="text-xl font-semibold mb-2">IDE Native</h3>
                <p className="text-neutral-400">
                  Stop context switching. Generate links and open them without ever leaving your editor. Supports VS Code and its forks (Cursor, VSCodium).
                </p>
              </div>
              <div className="bg-neutral-900/50 p-8 rounded-xl border border-neutral-800">
                <TerminalIcon />
                <h3 className="text-xl font-semibold mb-2">Powerful CLI</h3>
                <p className="text-neutral-400">
                  For those who live in the terminal. The `get-codeshare` NPM package brings link generation to any shell environment.
                </p>
              </div>
            </div>
          </section>
          
          {/* --- FAQ / Security Section --- */}
          <section className="py-20 max-w-3xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold tracking-tight">Your Questions, Answered.</h2>
            </div>
            <div className="space-y-6 text-left">
                <div className="bg-neutral-900/50 p-6 rounded-lg border border-neutral-800">
                    <h3 className="font-semibold text-lg">Is my code stored on your servers?</h3>
                    <p className="text-neutral-400 mt-1">
                        <strong className="text-neutral-200">Never.</strong> Codeshare is stateless. The web view fetches code directly from your public GitHub repository in real-time. We do not see, store, or proxy your code.
                    </p>
                </div>
                 <div className="bg-neutral-900/50 p-6 rounded-lg border border-neutral-800">
                    <h3 className="font-semibold text-lg">Is it open source?</h3>
                    <p className="text-neutral-400 mt-1">
                        Yes. The entire suite—VS Code extension, CLI, and this web app—is open source and available on GitHub under the MIT License.
                    </p>
                </div>
            </div>
          </section>

          {/* --- Footer --- */}
          <footer className="text-center py-10 border-t border-neutral-800 mt-20">
            <p className="text-neutral-500">
              A project by{' '}
              <a href="https://github.com/Sarthakischill" className="underline hover:text-white" target="_blank" rel="noopener noreferrer">
                Sarthak
              </a>
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}