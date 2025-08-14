import Layout from "@/components/Layout";
import { SciFiButton } from "@/components/ui/scifi-button";

export default function Documentation() {
  return (
    <Layout 
      title="Documentation - Codeshare" 
      description="Learn how to use Codeshare for fast code sharing"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Documentation
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about using Codeshare for lightning-fast code sharing.
            </p>
          </div>

          {/* Coming Soon Section */}
          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <svg 
                  className="w-8 h-8 text-primary" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                Documentation Coming Soon
              </h2>
              <p className="text-muted-foreground mb-6">
                We&apos;re working hard to create comprehensive documentation for Codeshare. 
                In the meantime, check out our GitHub repository for setup instructions and examples.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SciFiButton asChild>
                <a
                  href="https://github.com/Sarthakischill/codeshare-project"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on GitHub
                </a>
              </SciFiButton>
              <SciFiButton asChild>
                <a
                  href="https://marketplace.visualstudio.com/items?itemName=Sarthakischill.codeshare-by-sarthak"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Install Extension
                </a>
              </SciFiButton>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                VS Code Extension
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Install the extension to share code directly from your editor.
              </p>
              <a
                href="https://marketplace.visualstudio.com/items?itemName=Sarthakischill.codeshare-by-sarthak"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm"
              >
                Get Extension →
              </a>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                CLI Tool
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Use the command line interface for quick code sharing.
              </p>
              <a
                href="https://www.npmjs.com/package/get-codeshare"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm"
              >
                View on NPM →
              </a>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Contributing
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Help us improve Codeshare by contributing to the project.
              </p>
              <a
                href="https://github.com/Sarthakischill/codeshare-project/blob/main/CONTRIBUTING.md"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm"
              >
                Learn More →
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}