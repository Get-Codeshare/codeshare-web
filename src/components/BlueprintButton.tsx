import { ReactNode } from 'react';
import Link from 'next/link';

const Corner = ({ position }: { position: string }) => {
  const baseClasses = "absolute text-neutral-400"; // Slightly darker for better visibility on white
  const positionClasses: Record<string, string> = {
    'top-left': 'top-0 left-0 -mt-1 -ml-1',
    'top-right': 'top-0 right-0 -mt-1 -mr-1 transform rotate-90',
    'bottom-left': 'bottom-0 left-0 -mb-1 -ml-1 transform -rotate-90',
    'bottom-right': 'bottom-0 right-0 -mb-1 -mr-1 transform rotate-180',
  };
  return (
    <svg width="12" height="12" viewBox="0 0 10 10" className={`${baseClasses} ${positionClasses[position]}`}>
      <path d="M 0 5 L 0 0 L 5 0" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
};

interface BlueprintButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
  isExternal?: boolean;
}

export default function BlueprintButton({ href, children, className = '', isExternal = false }: BlueprintButtonProps) {
  const commonClasses = `relative inline-block bg-white text-black font-semibold py-3 px-6 border border-neutral-300 hover:bg-neutral-100 transition-colors ${className}`;
  
  const content = (
    <>
      <Corner position="top-left" />
      <Corner position="top-right" />
      <Corner position="bottom-left" />
      <Corner position="bottom-right" />
      {children}
    </>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={commonClasses}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={commonClasses}>
      {content}
    </Link>
  );
}