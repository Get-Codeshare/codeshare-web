import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function NpmCommand() {
  const [copied, setCopied] = useState(false);
  const command = 'npx get-codeshare';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="group relative inline-block">
      <button
        type="button"
        onClick={handleCopy}
        className={cn(
          'relative inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden whitespace-nowrap font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50',
          'rounded',
          'shadow-[0px_-82px_68px_-109px_inset_rgba(255,255,255,0.3),0px_98px_100px_-170px_inset_rgba(255,255,255,0.6),0px_4px_18px_-8px_inset_rgba(255,255,255,0.6),0px_1px_40px_-14px_inset_rgba(255,255,255,0.3)]',
          'border border-border hover:animate-[borderGlitch_0.6s_ease-in-out]',
          'text-center font-normal tracking-[-0.18px]',
          'active:scale-[0.98]',
          'h-11 px-6 py-3 text-base',
          'bg-foreground/5 text-foreground backdrop-blur-[50px]'
        )}
        aria-label="Copy command"
      >
        <div className="flex items-center gap-2">
          <span className="text-foreground/60 select-none font-mono">$</span>
          <span className="whitespace-nowrap font-mono">{command}</span>
          {copied ? (
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-foreground/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          )}
        </div>
      </button>

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-0 h-2 w-2 group-hover:animate-[cornerGlitch_0.6s_ease-in-out]">
          <div className="absolute top-0 left-0.5 h-0.5 w-1.5 origin-left bg-foreground" />
          <div className="absolute top-0 left-0 h-2 w-0.5 origin-top bg-foreground" />
        </div>

        <div className="-scale-x-[1] absolute top-0 right-0 h-2 w-2 group-hover:animate-[cornerGlitch_0.6s_ease-in-out]">
          <div className="absolute top-0 left-0.5 h-0.5 w-1.5 origin-left bg-foreground" />
          <div className="absolute top-0 left-0 h-2 w-0.5 origin-top bg-foreground" />
        </div>

        <div className="-scale-y-[1] absolute bottom-0 left-0 h-2 w-2 group-hover:animate-[cornerGlitch_0.6s_ease-in-out]">
          <div className="absolute top-0 left-0.5 h-0.5 w-1.5 origin-left bg-foreground" />
          <div className="absolute top-0 left-0 h-2 w-0.5 origin-top bg-foreground" />
        </div>

        <div className="-scale-[1] absolute right-0 bottom-0 h-2 w-2 group-hover:animate-[cornerGlitch_0.6s_ease-in-out]">
          <div className="absolute top-0 left-0.5 h-0.5 w-1.5 origin-left bg-foreground" />
          <div className="absolute top-0 left-0 h-2 w-0.5 origin-top bg-foreground" />
        </div>
      </div>
    </div>
  );
}