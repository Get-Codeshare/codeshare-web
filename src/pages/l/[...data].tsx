import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import CodeViewer from "@/components/CodeViewer";

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
          <div className="flex justify-center">
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
