import { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
// We'll keep the dark style for the code itself for contrast, like the Tailwind Docs
import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

interface CodeViewerProps {
  title: string;
  code: string | null;
  language: string | null;
  startingLineNumber?: number;
  error?: string | null;
}

export default function CodeViewer({
  title,
  code,
  language,
  startingLineNumber = 1,
  error,
}: CodeViewerProps) {
  const [copyText, setCopyText] = useState('Copy');

  const handleCopy = () => {
    if (code && !error) {
      navigator.clipboard.writeText(code);
      setCopyText('Copied!');
      setTimeout(() => setCopyText('Copy'), 2000);
    }
  };

  return (
    // This component will have a dark background for contrast, even on the light page
    <div className="w-full max-w-4xl mt-12 bg-[#282c34] rounded-xl border border-neutral-700 text-left shadow-2xl">
      {/* Card Header */}
      <div className="flex justify-between items-center px-4 py-3 bg-black/20 border-b border-neutral-700 rounded-t-xl">
        <span className="font-mono text-sm text-neutral-300">{title}</span>
        <button
          onClick={handleCopy}
          disabled={!!error || !code}
          className="bg-neutral-700 text-neutral-200 font-semibold py-1 px-3 rounded-md text-sm hover:bg-neutral-600 transition-colors disabled:bg-neutral-800 disabled:text-neutral-500 disabled:cursor-not-allowed"
        >
          {copyText}
        </button>
      </div>

      {/* Card Body */}
      {error ? (
        <div className="p-6 text-center text-red-400 font-mono">{error}</div>
      ) : (
        <SyntaxHighlighter
          language={language || 'plaintext'}
          style={atomOneDark}
          showLineNumbers={!!startingLineNumber}
          startingLineNumber={startingLineNumber}
          customStyle={{
            margin: 0,
            padding: '1.25rem',
            borderRadius: '0 0 0.75rem 0.75rem',
            backgroundColor: 'transparent',
          }}
          codeTagProps={{
            style: {
              fontFamily: 'var(--font-geist-mono), monospace',
            }
          }}
        >
          {code || 'Loading code...'}
        </SyntaxHighlighter>
      )}
    </div>
  );
}