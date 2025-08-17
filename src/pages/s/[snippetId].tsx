// File: src/pages/s/[snippetId].tsx
// Version: MODIFIED

import { GetServerSideProps, NextPage } from "next";
import { kv } from "@vercel/kv";
import Layout from "@/components/Layout";
import CodeViewer from "@/components/CodeViewer";
import { SciFiButton } from "@/components/ui/scifi-button";

interface Snippet {
  code: string;
  language: string;
  repo?: string;
  branch?: string;
  file?: string;
  lines?: string;
}

interface Props {
  snippet: Snippet | null;
  error?: string;
}

const SnippetPage: NextPage<Props> = ({ snippet, error }) => {
  const hasRepoInfo = snippet && snippet.repo && snippet.branch && snippet.file && snippet.lines;
  let githubUrl = "";
  if (hasRepoInfo) {
      const repoPath = snippet.repo!.replace("https://github.com/", "");
      githubUrl = `https://github.com/${repoPath}/blob/${snippet.branch}/${snippet.file}#L${snippet.lines!.split("-")[0]}`;
  }

  return (
    <Layout
      title={error ? "Codeshare - Error" : "Codeshare Snippet"}
      description="A shared code snippet from Codeshare."
    >
      <div className="flex min-h-screen items-center justify-center py-8">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6">
            <CodeViewer
              title={error ? "Error" : `Language: ${snippet?.language || "plaintext"}`}
              code={snippet?.code || null}
              language={snippet?.language || null}
              error={error}
              className="max-w-5xl"
            />
            {hasRepoInfo ? (
               <SciFiButton asChild>
                <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                  View on GitHub
                </a>
              </SciFiButton>
            ) : (
                <div className="relative" title="This snippet is not linked to a GitHub repository.">
                    <SciFiButton disabled>
                      View on GitHub
                    </SciFiButton>
                </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { snippetId } = context.params!;

  if (typeof snippetId !== "string") {
    return { props: { snippet: null, error: "Invalid snippet ID format." } };
  }

  try {
    const snippet: Snippet | null = await kv.get(snippetId);

    if (!snippet) {
      return {
        props: { snippet: null, error: "Snippet not found or has expired." },
      };
    }
    return { props: { snippet } };
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : "Unknown error";
    console.error(
      `[SNIPPET PAGE] A fatal error occurred while retrieving from KV:`,
      errorMessage
    );
    return { props: { snippet: null, error: "Failed to retrieve snippet." } };
  }
};

export default SnippetPage;