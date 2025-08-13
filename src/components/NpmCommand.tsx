"use client"; // This marks the component as interactive

import { useState } from 'react';

export default function NpmCommand() {
  const [copyText, setCopyText] = useState('Copy');
  const command = 'npm install -g get-codeshare';

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopyText('Copied!');
    setTimeout(() => {
      setCopyText('Copy');
    }, 2000);
  };

  return (
    <div className="inline-flex items-center" aria-label="NPM install command">
      <div className="relative bg-neutral-50 border border-neutral-200 rounded-lg py-2 px-3 text-left font-mono text-sm text-neutral-800 flex items-center shadow-sm">
        <span className="text-neutral-400 select-none mr-2">$</span>
        <span className="whitespace-nowrap">{command}</span>
        <button
          onClick={handleCopy}
          className="ml-3 p-1 hover:bg-neutral-200 rounded transition-colors"
          title="Copy command"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}