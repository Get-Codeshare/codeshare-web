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
  vscodeUri: string; // Keep as a base
  rawCodeUrl: string;
}

interface Props {
  linkData: LinkData | null;
  errorCode?: number;
}

const LinkPage: NextPage<Props> = ({ linkData, errorCode }) => {
  const [fallbackVisible, setFallbackVisible] = useState(false);
  const [code, setCode] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<ReactNode | null>(null);

  const getIdeUri = (protocol: IdeProtocol, baseUri: string): string => {
    return baseUri.replace('vscode://', `${protocol}://`);
  };

  useEffect(() => {
    if (!linkData) return;

    // Check for a saved preference
    const preferredIde = localStorage.getItem('preferredIde') as IdeProtocol | null;
    const targetUri = preferredIde ? getIdeUri(preferredIde, linkData.vscodeUri) : linkData.vscodeUri;
    
    window.location.href = targetUri;

    const redirectTimer = setTimeout(() => {
      setFallbackVisible(true);

      // --- TIMEOUT IMPLEMENTATION ---
      const controller = new AbortController();
      const signal = controller.signal;

      // Set a timeout to abort the fetch request (e.g., 8 seconds)
      const fetchTimeoutId = setTimeout(() => {
        controller.abort();
      }, 8000);

      fetch(linkData.rawCodeUrl, { signal }) // Pass the signal to fetch
        .then((res) => {
          // Clear the timeout if the request succeeds
          clearTimeout(fetchTimeoutId);
          if (!res.ok) {
            if (res.status === 404) {
              return Promise.reject(
                new Error(
                  "Error: File not found. The repository may be private, the branch incorrect, or the file path may have changed."
                )
              );
            }
            return Promise.reject(
              new Error(`Could not fetch code (HTTP ${res.status})`)
            );
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
          // Clear the timeout in case of other errors too
          clearTimeout(fetchTimeoutId);
          setCode(null);

          // Check if the error was due to the timeout
          if (error.name === 'AbortError') {
            setFetchError("The request to fetch the code timed out. The server may be slow or unavailable.");
            return;
          }
          
          const repoPath = linkData.repo.replace("https://github.com/", "");
          const githubUrl = `https://github.com/${repoPath}/blob/${
            linkData.branch
          }/${linkData.file}#L${linkData.lines.split("-")[0]}`;

          const errorMessage = (
            <p>
              {error.message}
              <br />
              <br />
              You can try{" "}
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground"
              >
                viewing the file on GitHub
              </a>
              .
            </p>
          );
          setFetchError(errorMessage);
        });
    }, 500);

    return () => clearTimeout(redirectTimer);
  }, [linkData]);
  
  const handleIdeChoice = (protocol: IdeProtocol) => {
    if (!linkData) return;
    // Save the user's choice
    localStorage.setItem('preferredIde', protocol);
    // Attempt to redirect immediately
    window.location.href = getIdeUri(protocol, linkData.vscodeUri);
  };

  if (errorCode || !linkData) {
    return (
      <Layout title="Codeshare - Invalid Link" description="Invalid Codeshare link.">
        <div className="flex min-h-screen items-center justify-center py-8">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center">
              <CodeViewer
                title="Error"
                code={null}
                language={null}
                error="Invalid link format. Please generate a new one."
                className="max-w-5xl"
              />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Loading / Redirecting state
  if (!fallbackVisible) {
    return (
      <Layout title="Redirecting to VS Code..." description="Redirecting to VS Code...">
        <div className="flex min-h-screen items-center justify-center py-8">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center">
              <CodeViewer
                title={`${linkData.file} (Lines ${linkData.lines})`}
                code={null}
                language={linkData.file.split('.').pop() || 'plaintext'}
                error="Redirecting to VS Code..."
                className="max-w-5xl"
              />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Fallback state
  return (
    <Layout
      title={`Codeshare: ${linkData.file}`}
      description={`Code from ${linkData.file} in repository ${linkData.repo}`}
    >
      <div className="flex min-h-screen items-center justify-center py-8">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-2">Editor not opening?</h2>
              <p className="text-muted-foreground mb-4">Choose your preferred editor to open this link and we&apos;ll remember it for next time.</p>
              <div className="flex flex-wrap justify-center gap-4">
                {ideOptions.map(ide => (
                  <SciFiButton key={ide.id} onClick={() => handleIdeChoice(ide.id)}>
                    Open in {ide.name}
                  </SciFiButton>
                ))}
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
  const vscodeUri = `vscode://${extensionId}/open?repo=${encodeURIComponent(
    repo
  )}&file=${encodeURIComponent(file)}&lines=${lines}`;
  const repoPath = repo.replace("https://github.com/", "");
  const rawCodeUrl = `https://raw.githubusercontent.com/${repoPath}/${branch}/${file}`;
  const linkData: LinkData = {
    repo,
    branch,
    file,
    lines,
    vscodeUri,
    rawCodeUrl,
  };

  return {
    props: {
      linkData,
    },
  };
};

export default LinkPage;