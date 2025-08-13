import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import CodeViewer from "@/components/CodeViewer";
import BlueprintCard from "@/components/BlueprintCard";
import BlueprintButton from "@/components/BlueprintButton";

interface LinkData {
  repo: string;
  branch: string;
  file: string;
  lines: string;
  vscodeUri: string;
  rawCodeUrl: string;
}

interface Props {
  linkData: LinkData | null;
  errorCode?: number;
}

const LinkPage: NextPage<Props> = ({ linkData, errorCode }) => {
  const [fallbackVisible, setFallbackVisible] = useState(false);
  const [code, setCode] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    if (!linkData) return;

    window.location.href = linkData.vscodeUri;

    const timer = setTimeout(() => {
      setFallbackVisible(true);
      fetch(linkData.rawCodeUrl)
        .then((res) => {
          if (!res.ok) {
            if (res.status === 404) {
              return Promise.reject(
                "Error: File not found. The repository may be private, the branch incorrect, or the file path may have changed."
              );
            }
            return Promise.reject(`Could not fetch code (HTTP ${res.status})`);
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
          setCode(null);
          setFetchError(error.toString());
        });
    }, 500);

    return () => clearTimeout(timer);
  }, [linkData]);

  if (errorCode || !linkData) {
    return (
      <Layout title="Codeshare - Invalid Link" description="Invalid Codeshare link.">
        <div className="container mx-auto px-4 py-24 flex justify-center">
          <BlueprintCard className="w-full max-w-5xl text-center">
            <h1 className="font-audiowide text-2xl md:text-3xl">Invalid Link</h1>
            <p className="text-neutral-600 mt-2">The link format is incorrect. Please generate a new one.</p>
          </BlueprintCard>
        </div>
      </Layout>
    );
  }

  // Loading / Redirecting state
  if (!fallbackVisible) {
    return (
      <Layout title="Redirecting to VS Code..." description="Redirecting to VS Code...">
        <div className="container mx-auto px-4 py-24 flex justify-center">
          <BlueprintCard className="w-full max-w-5xl text-center">
            <h1 className="font-audiowide text-2xl md:text-3xl">Redirecting to VS Code...</h1>
            <p className="text-neutral-600 mt-2">If nothing happens, you may need to install the Codeshare extension.</p>
          </BlueprintCard>
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
      <div className="container mx-auto px-4 py-24 flex justify-center">
        <BlueprintCard className="w-full max-w-5xl">
          <div className="text-center">
            <h1 className="font-audiowide text-2xl md:text-3xl tracking-tighter">
              Could Not Redirect.
            </h1>
            <p className="max-w-2xl mx-auto mt-2 text-neutral-600">
              Here&apos;s a web preview instead. Install our extension for a seamless experience.
            </p>
          </div>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://marketplace.visualstudio.com/items?itemName=Sarthakischill.codeshare-by-sarthak"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-block bg-black text-white font-semibold py-3 px-6 hover:bg-neutral-800 transition-colors rounded-lg"
            >
              Install VS Code Extension
            </a>
            <BlueprintButton
              href={`${linkData.repo}/blob/${linkData.branch}/${linkData.file}#L${linkData.lines.split('-')[0]}-L${linkData.lines.split('-')[1]}`}
              isExternal={true}
            >
              View on GitHub
            </BlueprintButton>
          </div>

          <CodeViewer
            title={`${linkData.file} (Lines ${linkData.lines})`}
            code={code}
            language={linkData.file.split('.').pop() || 'plaintext'}
            startingLineNumber={parseInt(linkData.lines.split('-')[0] || '1')}
            error={fetchError}
          />
        </BlueprintCard>
      </div>
    </Layout>
  );
};

// getServerSideProps remains unchanged
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
