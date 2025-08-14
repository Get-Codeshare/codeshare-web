'use client';

import { SciFiButton } from '@/components/ui/scifi-button';
import { Spotlight } from '@/components/ui/spotlight';
import { CodeIcon } from '@/components/icons';

export default function Hero() {
  const handleGetStarted = () => {
    window.open(
      'https://marketplace.visualstudio.com/items?itemName=Sarthakischill.codeshare-by-sarthak',
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <section className="relative flex min-h-[100svh] w-full flex-col items-center overflow-hidden">
      <Spotlight transform="translateX(-60%) translateY(-50%)" />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 pt-12 pb-6 sm:pt-16 sm:pb-8 lg:grid-cols-2 lg:gap-12 lg:pt-20 lg:pb-12 xl:gap-16">
          {/* Text Content */}
          <div className="order-2 flex flex-col items-center gap-6 text-center lg:order-1 lg:items-start lg:gap-8 lg:text-left">
            <h1 className="text-balance font-semibold text-3xl leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-[72px]">
              <span className="block whitespace-normal">
                Code <span className="text-muted-foreground">sharing</span>
              </span>
              <span className="block whitespace-normal">
                Made <span className="text-muted-foreground">simple</span>
              </span>
            </h1>

            <p className="max-w-prose text-balance font-medium text-muted-foreground text-sm leading-relaxed tracking-tight sm:text-base lg:text-lg">
              Generate universal links to specific lines of code that open in VS Code for teammates and in the browser for everyone else.
            </p>

            <div className="flex w-full justify-center pt-2 lg:justify-start">
              <SciFiButton
                className="w-full sm:w-auto"
                onClick={handleGetStarted}
                size="lg"
              >
                GET STARTED
              </SciFiButton>
            </div>
          </div>

          {/* Code Visualization */}
          <div className="order-1 flex w-full justify-center lg:order-2 lg:justify-end">
            <div className="w-full max-w-lg lg:max-w-none">
              <div className="relative rounded-lg border border-border bg-card/50 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-4">
                  <CodeIcon className="h-5 w-5 text-accent" />
                  <span className="text-sm font-medium text-foreground">example.js</span>
                </div>
                <div className="space-y-2 font-mono text-sm">
                  <div className="text-muted-foreground">
                    <span className="text-accent">function</span>{' '}
                    <span className="text-foreground">shareCode</span>() {'{'}
                  </div>
                  <div className="pl-4 text-muted-foreground">
                    <span className="text-accent">const</span>{' '}
                    <span className="text-foreground">link</span> = 
                    <span className="text-green-500"> generateLink</span>();
                  </div>
                  <div className="pl-4 text-muted-foreground">
                    <span className="text-accent">return</span>{' '}
                    <span className="text-foreground">link</span>;
                  </div>
                  <div className="text-muted-foreground">{'}'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}