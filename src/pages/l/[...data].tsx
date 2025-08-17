// File: src/pages/l/[...data].tsx
// Version: MODIFIED

import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState, ReactNode } from "react";
import Layout from "@/components/Layout";
import CodeViewer from "@/components/CodeViewer";
import { SciFiButton } from "@/components/ui/scifi-button";

// Define our supported IDEs
type IdeProtocol = 'vscode' | 'cursor';
const ideOptions: { id: IdeProtocol, name: string }[] = [
    { id: 'vscode', name: 'VS Code' },
    { id: 'cursor', name: 'Cursor' },
];

interface LinkData {
  repo: string;
  branch: string;
  file: string;
  lines: string;
  vscodeUri: string;
  rawCodeUrl: string;
  githubUrl: string; // Added for convenience
}

interface Props {
  linkData: LinkData | null;
  errorCode?: number;
}

const LinkPage: NextPage<Props> = ({ linkData, errorCode }) => {
  const [pageState, setPageState] = useState<'loading' | 'ide_choice' | 'redirecting'>('loading');
  const [code, setCode] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<ReactNode | null>(null);

  const getIdeUri = (protocol: IdeProtocol, baseUri: string): string => {
    return baseUri.replace('vscode://', `${protocol}://`);
  };

  // Main effect to control the page flow
  useEffect(() => {
    if (!linkData) return;

    const preferredIde = localStorage.getItem('preferredIde') as IdeProtocol | null;

    if (preferredIde) {
      setPageState('redirecting');
      window.location.href = getIdeUri(preferredIde, linkData.vscodeUri);
    } else {
      setPageState('ide_choice');
    }
  }, [linkData]);

  // Effect for fetching code when in the redirecting/fallback state
  useEffect(() => {
    if (pageState !== 'redirecting' || !linkData) return;

    const fetchTimer = setTimeout(() => {
      const controller = new AbortController();
      const signal = controller.signal;
      const fetchTimeoutId = setTimeout(() => controller.abort(), 8000);

      fetch(linkData.rawCodeUrl, { signal })
        .then((res) => {
          clearTimeout(fetchTimeoutId);
          if (!res.ok) {
            if (res.status === 404) {
              return Promise.reject(new Error("Error: File not found. The repository may be private, the branch incorrect, or the file path may have changed."));
            }
            return Promise.reject(new Error(`Could not fetch code (HTTP ${res.status})`));
          }
          return res.text();
        })
        .then((text) => {
          const linesArr = text.split("\n");
          const [start, end] = linkData.lines.split("-").map(Number);
          const relevantLines = linesArr.slice(start - 1, end).join("\n");
          setCode(relevantLines);
          setFetchError(null);
        })
        .catch((error: Error) => {
          clearTimeout(fetchTimeoutId);
          setCode(null);
          if (error.name === 'AbortError') {
            setFetchError("The request to fetch the code timed out. The server may be slow or unavailable.");
            return;
          }
          const errorMessage = (
            <p>
              {error.message}
              <br /><br />
              You can try{" "}
              <a href={linkData.githubUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
                viewing the file on GitHub
              </a>.
            </p>
          );
          setFetchError(errorMessage);
        });
    }, 500);

    return () => clearTimeout(fetchTimer);
  }, [pageState, linkData]);

  const handleIdeChoice = (protocol: IdeProtocol) => {
    if (!linkData) return;
    localStorage.setItem('preferredIde', protocol);
    setPageState('redirecting');
    window.location.href = getIdeUri(protocol, linkData.vscodeUri);
  };

  if (errorCode || !linkData) {
    return (
      <Layout title="Codeshare - Invalid Link" description="Invalid Codeshare link.">
        <div className="flex min-h-screen items-center justify-center py-8">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center">
              <CodeViewer title="Error" code={null} language={null} error="Invalid link format. Please generate a new one." className="max-w-5xl" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (pageState === 'loading') {
    return (
      <Layout title="Loading..." description="Loading Codeshare link...">
        <div className="flex min-h-screen items-center justify-center">
            <p className="text-muted-foreground animate-pulse">Initializing...</p>
        </div>
      </Layout>
    );
  }

  if (pageState === 'ide_choice') {
    return (
      <Layout title="Choose your Editor" description="Select your preferred editor for Codeshare links.">
        <div className="flex min-h-screen items-center justify-center py-8">
          <div className="mx-auto w-full max-w-2xl px-4 sm:px-6 lg:px-8">
            <div className="bg-card border border-border rounded-lg p-8 text-center shadow-lg animate-fade-in">
              <h2 className="text-2xl font-bold text-foreground mb-2">Welcome to Codeshare!</h2>
              <p className="text-muted-foreground mb-6">Choose your preferred editor for opening links. We&apos;ll remember your choice for next time.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                {ideOptions.map(ide => (
                  <SciFiButton key={ide.id} onClick={() => handleIdeChoice(ide.id)} size="lg">
                    Continue with {ide.name}
                  </SciFiButton>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-6">This will attempt to open the link directly in your local editor.</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`Codeshare: ${linkData.file}`} description={`Code from ${linkData.file} in repository ${linkData.repo}`}>
      <div className="flex min-h-screen items-center justify-center py-8">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-8">
            <div className="text-center animate-fade-in">
              <h2 className="text-2xl font-bold text-foreground mb-2">Editor not opening?</h2>
              <p className="text-muted-foreground mb-4">Choose your editor to try again, or view the file on GitHub.</p>
              <div className="flex flex-wrap justify-center gap-4">
                {ideOptions.map(ide => (
                  <SciFiButton key={ide.id} onClick={() => window.location.href = getIdeUri(ide.id, linkData.vscodeUri)}>
                    Open in {ide.name}
                  </SciFiButton>
                ))}
                <SciFiButton asChild variant="outline">
                    <a href={linkData.githubUrl} target="_blank" rel="noopener noreferrer">View on GitHub</a>
                </SciFiButton>
              </div>
            </div>
            <CodeViewer
              title={`${linkData.file} (Lines ${linkData.lines})`}
              code={code}
              language={linkData.file.split('.').pop() || 'plaintext'}
              startingLineNumber={parseInt(linkData.lines.split('-')[0] || '1')}
              error={fetchError}
              className="max-w-5xl"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { data } = context.params!;
    if (!Array.isArray(data) || data.length < 4) {
        return { props: { linkData: null, errorCode: 400 } };
    }

    const [repoB64, branchB64, fileB64, lines] = data;
    const repo = Buffer.from(repoB64, "base64url").toString("utf8");
    const branch = Buffer.from(branchB64, "base64url").toString("utf8");
    const file = Buffer.from(fileB64, "base64url").toString("utf8");

    const extensionId = "Sarthakischill.codeshare-by-sarthak";
    const vscodeUri = `vscode://${extensionId}/open?repo=${encodeURIComponent(repo)}&file=${encodeURIComponent(file)}&lines=${lines}`;
    const repoPath = repo.replace("https://github.com/", "");
    const rawCodeUrl = `https://raw.githubusercontent.com/${repoPath}/${branch}/${file}`;
    const githubUrl = `https://github.com/${repoPath}/blob/${branch}/${file}#L${lines.split("-")[0]}`;

    const linkData: LinkData = { repo, branch, file, lines, vscodeUri, rawCodeUrl, githubUrl };

    return { props: { linkData } };
};

export default LinkPage;