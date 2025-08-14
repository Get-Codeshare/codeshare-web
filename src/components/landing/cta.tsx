"use client";

import { ArrowRightIcon } from "@/components/icons";
import { SciFiButton } from "@/components/ui/scifi-button";

export default function CTA() {
  return (
    <div className="w-full">
      <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8 lg:py-32">
        <div className="space-y-8">
          <h2 className="font-semibold text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            <span className="block">Ready to transform</span>
            <span className="block text-muted-foreground">
              your code sharing?
            </span>
          </h2>

          <p className="mx-auto max-w-3xl text-lg text-muted-foreground sm:text-xl">
            Join thousands of developers who've made code sharing effortless
            with Codeshare.
          </p>

          <div className="flex flex-col items-center gap-4 pt-4 sm:flex-row sm:justify-center">
            <SciFiButton
              onClick={() =>
                window.open(
                  "https://marketplace.visualstudio.com/items?itemName=Sarthakischill.codeshare-by-sarthak",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
              size="lg"
              className="w-full sm:w-auto"
            >
              Install Extension
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </SciFiButton>

            <SciFiButton
              onClick={() =>
                window.open(
                  "https://www.npmjs.com/package/get-codeshare",
                  "_blank"
                )
              }
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              Try CLI Tool
            </SciFiButton>
          </div>

          <div className="pt-8">
            <p className="text-muted-foreground text-sm">
              Free forever • No account required • Works everywhere
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
