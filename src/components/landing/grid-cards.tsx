'use client';

import { SciFiGridCard } from '@/components/SciFiGridCard';
import {
  VSCodeIcon,
  TerminalIcon,
  WebIcon,
  SpeedIcon,
  SecurityIcon,
  ShareIcon,
} from '@/components/icons';

const cards = [
  {
    id: 1,
    title: 'VS Code Integration',
    description:
      'Right-click to generate links. Click links to open files directly in your editor.',
    icon: VSCodeIcon,
  },
  {
    id: 2,
    title: 'CLI Power',
    description:
      'Terminal-first workflow with the get-codeshare NPM package for any shell.',
    icon: TerminalIcon,
  },
  {
    id: 3,
    title: 'Web Fallback',
    description: 'Beautiful web view for users without the extension installed.',
    icon: WebIcon,
  },
  {
    id: 4,
    title: 'Lightning Fast',
    description:
      'Instant link generation and seamless opening across all platforms.',
    icon: SpeedIcon,
  },
  {
    id: 5,
    title: 'Secure & Private',
    description: 'Your code stays private. Links expire automatically.',
    icon: SecurityIcon,
  },
  {
    id: 6,
    title: 'Universal Sharing',
    description:
      'Share via Slack, email, or any platform. Works everywhere.',
    icon: ShareIcon,
  },
];

export const GridCards = () => {
  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="mb-12 text-center lg:mb-16 lg:text-left">
        <h2 className="mx-auto max-w-4xl font-semibold text-3xl leading-tight sm:text-4xl lg:mx-0 lg:text-5xl">
          <span className="text-muted-foreground">Everything you need for </span>
          <span className="text-foreground">seamless code sharing</span>
        </h2>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-10 xl:gap-12">
        {cards.map((card) => (
          <div className="flex" key={card.id}>
            <SciFiGridCard
              description={card.description}
              icon={card.icon}
              title={card.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
};