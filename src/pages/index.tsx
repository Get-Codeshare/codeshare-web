import Layout from "@/components/Layout";
import Card from "@/components/Card";
import FeatureCard from "@/components/FeatureCard";
import { SciFiButton } from "@/components/ui/scifi-button";
import NpmCommand from "@/components/NpmCommand";
import { SciFiGridCard } from "@/components/SciFiGridCard";
import CTA from "@/components/landing/cta";
import { CLITerminalDemo } from "@/components/demos/cli-terminal-demo";
import { KeyboardShortcutDemo } from "@/components/demos/keyboard-shortcut-demo";
import { WebPlatformImageDemo } from "@/components/demos/web-platform-image-demo";
import {
  VSCodeIcon,
  TerminalIcon,
  WebIcon,
  SpeedIcon,
  SecurityIcon,
  ShareIcon,
} from "@/components/icons";

const features = [
  {
    id: 1,
    title: "VS Code Integration",
    description:
      "Right-click to generate links. Click links to open files directly in your editor.",
    icon: VSCodeIcon,
  },
  {
    id: 2,
    title: "CLI Power",
    description:
      "Terminal-first workflow with the get-codeshare NPM package for any shell.",
    icon: TerminalIcon,
  },
  {
    id: 3,
    title: "Web Fallback",
    description:
      "Beautiful web view for users without the extension installed.",
    icon: WebIcon,
  },
  {
    id: 4,
    title: "Lightning Fast",
    description:
      "Instant link generation and seamless opening across all platforms.",
    icon: SpeedIcon,
  },
  {
    id: 5,
    title: "Secure & Private",
    description: "Your code stays private. Links expire automatically.",
    icon: SecurityIcon,
  },
  {
    id: 6,
    title: "Universal Sharing",
    description: "Share via Slack, email, or any platform. Works everywhere.",
    icon: ShareIcon,
  },
];

export default function HomePage() {
  return (
    <Layout
      title="Codeshare - The Missing Link For Your Code"
      description="Generate universal links to specific lines of code that open in VS Code for teammates and in the browser for everyone else."
    >
      <div className="container mx-auto px-4">
        {/* --- Hero Section --- */}
        <section className="text-center pt-24 pb-16 md:pt-32 md:pb-24">
          <h1 className="font-sans text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
            The Missing Link
          </h1>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-muted-foreground">
            For Your Code.
          </h2>
          <p className="max-w-2xl mx-auto mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
            Generate universal links to specific lines of code. They open
            directly in VS Code for teammates and fall back to a web view for
            everyone else.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center">
            <SciFiButton asChild size="lg">
              <a
                href="https://marketplace.visualstudio.com/items?itemName=Sarthakischill.codeshare-by-sarthak"
                target="_blank"
                rel="noopener noreferrer"
              >
                Install
              </a>
            </SciFiButton>
            <NpmCommand />
          </div>
        </section>

        {/* --- Enhanced Feature Grid Section --- */}
        <section className="pb-24 md:pb-32">
          <div className="text-center mb-16">
            <h2 className="font-sans text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything you need for seamless code sharing
            </h2>
            <p className="max-w-xl mx-auto mt-4 text-lg text-muted-foreground">
              A complete toolkit for modern developers.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-10 xl:gap-12">
            {features.map((feature) => (
              <div className="flex" key={feature.id}>
                <SciFiGridCard
                  description={feature.description}
                  icon={feature.icon}
                  title={feature.title}
                />
              </div>
            ))}
          </div>
        </section>

        {/* --- Feature Deep Dive Section --- */}
        <section className="pb-24 md:pb-32">
          <div className="text-center mb-16">
            <h2 className="font-sans text-3xl md:text-4xl font-bold text-foreground">
              One Tool, Every Workflow.
            </h2>
            <p className="max-w-xl mx-auto mt-4 text-lg text-muted-foreground">
              A seamless experience, from your IDE to the browser, to your
              terminal.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              title="VS Code Extension"
              description="Generate links with a right-click or shortcut. Click a codeshare link and it opens the file directly in your local editor."
              imageUrl="keyboard-shortcut"
            >
              <KeyboardShortcutDemo />
            </FeatureCard>
            <FeatureCard
              title="Powerful CLI"
              description="For those who live in the terminal. The get-codeshare NPM package brings context-aware link generation to any shell."
              imageUrl="cli-terminal"
            >
              <CLITerminalDemo />
            </FeatureCard>
            <FeatureCard
              title="Web Platform"
              description="The hub that powers it all. Provides a beautiful, read-only web view for users without the extension."
              imageUrl="web-platform"
            >
              <WebPlatformImageDemo />
            </FeatureCard>
          </div>
        </section>

        {/* --- How it Works Section --- */}
        <section className="pb-24 md:pb-32">
          <div className="text-center mb-16">
            <h2 className="font-sans text-3xl md:text-4xl font-bold text-foreground">
              How It Works
            </h2>
            <p className="max-w-xl mx-auto mt-4 text-lg text-muted-foreground">
              Three simple steps to seamless code sharing.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <div className="w-16 h-16 bg-foreground text-background rounded-lg flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Select & Generate
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Highlight code in VS Code or use the CLI to generate a universal
                link.
              </p>
            </Card>
            <Card className="text-center">
              <div className="w-16 h-16 bg-foreground text-background rounded-lg flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Share Anywhere
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Send the link via Slack, email, or any communication platform.
              </p>
            </Card>
            <Card className="text-center">
              <div className="w-16 h-16 bg-foreground text-background rounded-lg flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Smart Opening
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Recipients with the extension see it in VS Code, others get a
                web view.
              </p>
            </Card>
          </div>
        </section>

        {/* --- Final CTA --- */}
        <CTA />
      </div>
    </Layout>
  );
}