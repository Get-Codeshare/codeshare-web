import Layout from '@/components/Layout';
import BlueprintCard from '@/components/BlueprintCard';
import FeatureCard from '@/components/FeatureCard';
import NpmCommand from '@/components/NpmCommand';



export default function HomePage() {
  return (
    <Layout
      title="Codeshare - The Missing Link For Your Code"
      description="Generate universal links to specific lines of code that open in VS Code for teammates and in the browser for everyone else."
    >
      <div className="container mx-auto px-4">
        {/* --- Hero Section --- */}
        <section className="text-center pt-24 pb-16 md:pt-32 md:pb-24">
          <h1 className="font-audiowide text-4xl md:text-6xl lg:text-7xl tracking-tighter">
            The Missing Link
          </h1>
          <h2 className="text-4xl md:text-6xl lg:text-7xl text-neutral-500">
            For Your Code.
          </h2>
          <p className="max-w-2xl mx-auto mt-6 text-base md:text-lg text-neutral-600">
            Generate universal links to specific lines of code. They open directly in VS Code for teammates and fall back to a web view for everyone else.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://marketplace.visualstudio.com/items?itemName=Sarthakischill.codeshare-by-sarthak"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black text-white font-semibold py-3 px-6 rounded-lg hover:bg-neutral-800 transition-colors"
            >
              Install for VS Code
            </a>
            <NpmCommand />
            <a
              href="https://github.com/Sarthakischill/codeshare-project"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 hover:text-black transition-colors font-medium"
            >
              View on GitHub
            </a>
          </div>
        </section>



        {/* --- Feature Deep Dive Section --- */}
        <section className="pb-24 md:pb-32">
          <div className="text-center mb-16">
            <h2 className="font-audiowide text-3xl md:text-4xl">
              One Tool, Every Workflow.
            </h2>
            <p className="max-w-xl mx-auto mt-4 text-neutral-600">
              A seamless experience, from your IDE to the browser, to your
              terminal.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              title="VS Code Extension"
              description="Generate links with a right-click or shortcut. Click a codeshare link and it opens the file directly in your local editor."
              imageUrl="/feature-vscode.png"
            />
            <FeatureCard
              title="Powerful CLI"
              description="For those who live in the terminal. The `get-codeshare` NPM package brings context-aware link generation to any shell."
              imageUrl="/feature-cli.png"
            />
            {/* Placeholder for the Web Platform feature - will be replaced with FeatureCard once you add feature-web.png */}
            <BlueprintCard className="flex flex-col text-center">
              <div className="h-60 w-full mb-6 rounded-lg bg-neutral-100 border border-neutral-200 flex items-center justify-center">
                <p className="text-neutral-400">Web UI Screenshot</p>
              </div>
              
              <h3 className="text-xl font-bold mb-2">The Web Platform</h3>
              <p className="text-neutral-600 flex-grow">
                The hub that powers it all. Provides a beautiful, read-only web view for users without the extension.
              </p>
            </BlueprintCard>
          </div>
        </section>

        {/* --- How it Works Section --- */}
        <section className="pb-24 md:pb-32">
          <div className="text-center mb-16">
            <h2 className="font-audiowide text-3xl md:text-4xl">
              How It Works
            </h2>
            <p className="max-w-xl mx-auto mt-4 text-neutral-600">
              Three simple steps to seamless code sharing.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Select & Generate</h3>
              <p className="text-neutral-600">
                Highlight code in VS Code or use the CLI to generate a universal
                link.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Share Anywhere</h3>
              <p className="text-neutral-600">
                Send the link via Slack, email, or any communication platform.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Smart Opening</h3>
              <p className="text-neutral-600">
                Recipients with the extension see it in VS Code, others get a
                web view.
              </p>
            </div>
          </div>
        </section>

        {/* --- Final CTA --- */}
        <section className="text-center py-24">
          <h2 className="font-audiowide text-3xl md:text-4xl">
            Start Sharing Code Intelligently.
          </h2>
          <div className="mt-8">
            <a
              href="https://marketplace.visualstudio.com/items?itemName=Sarthakischill.codeshare-by-sarthak"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black text-white font-semibold py-4 px-8 rounded-lg hover:bg-neutral-800 transition-colors text-lg"
            >
              Install for Free
            </a>
          </div>
        </section>
      </div>
    </Layout>
  );
}
