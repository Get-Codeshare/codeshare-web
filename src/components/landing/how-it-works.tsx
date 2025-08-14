'use client';

import { CheckIcon } from '@/components/icons';

const steps = [
  {
    number: '1',
    title: 'Select & Generate',
    description:
      'Highlight code in VS Code or use the CLI to generate a universal link.',
  },
  {
    number: '2',
    title: 'Share Anywhere',
    description:
      'Send the link via Slack, email, or any communication platform.',
  },
  {
    number: '3',
    title: 'Smart Opening',
    description:
      'Recipients with the extension see it in VS Code, others get a web view.',
  },
];

export default function HowItWorks() {
  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="mb-12 text-center lg:mb-16">
        <h2 className="mx-auto max-w-2xl font-medium text-2xl leading-tight sm:text-3xl lg:text-4xl xl:text-5xl">
          How it works
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground text-sm sm:text-base lg:text-lg">
          Three simple steps to seamless code sharing
        </p>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
        {steps.map((step, index) => (
          <div
            key={step.number}
            className="group relative flex flex-col items-center text-center"
          >
            {/* Step Number */}
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-border bg-card font-bold text-2xl text-foreground transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
              {step.number}
            </div>

            {/* Connector Line (hidden on last item) */}
            {index < steps.length - 1 && (
              <div className="absolute top-8 left-1/2 hidden h-px w-full translate-x-1/2 bg-border md:block" />
            )}

            {/* Content */}
            <h3 className="mb-3 font-semibold text-foreground text-xl">
              {step.title}
            </h3>
            <p className="max-w-sm text-muted-foreground leading-relaxed">
              {step.description}
            </p>

            {/* Check Icon */}
            <div className="mt-4 flex h-6 w-6 items-center justify-center rounded-full bg-accent/10">
              <CheckIcon className="h-4 w-4 text-accent" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}