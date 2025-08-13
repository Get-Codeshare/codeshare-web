import { ReactNode } from 'react';

// New corner component that perfectly matches the reference image
const Corner = ({ position }: { position: string }) => {
  const cornerClasses: { [key: string]: string[] } = {
    'top-left': ['top-0 left-0', '-translate-x-full', '-translate-y-full'],
    'top-right': ['top-0 right-0', 'translate-x-full', '-translate-y-full'],
    'bottom-left': ['bottom-0 left-0', '-translate-x-full', 'translate-y-full'],
    'bottom-right': ['bottom-0 right-0', 'translate-x-full', 'translate-y-full'],
  };

  const [pos, transX, transY] = cornerClasses[position];

  return (
    <div className={`absolute ${pos} w-5 h-5`} aria-hidden="true">
      <div className={`absolute w-full h-full transform ${transX} ${transY}`}>
        {/* These two divs create the corner shape */}
        <div className={`absolute ${position.includes('top') ? 'top-0' : 'bottom-0'} ${position.includes('left') ? 'left-0' : 'right-0'} w-px h-full bg-neutral-300`} />
        <div className={`absolute ${position.includes('top') ? 'top-0' : 'bottom-0'} ${position.includes('left') ? 'left-0' : 'right-0'} h-px w-full bg-neutral-300`} />
      </div>
    </div>
  );
};

export default function BlueprintCard({ children, className = '' }: { children: ReactNode; className?: string; }) {
  return (
    <div className={`relative bg-white p-8 border border-neutral-200 rounded-xl shadow-sm mt-8 ${className}`}>
      <Corner position="top-left" />
      <Corner position="top-right" />
      <Corner position="bottom-left" />
      <Corner position="bottom-right" />
      {children}
    </div>
  );
}