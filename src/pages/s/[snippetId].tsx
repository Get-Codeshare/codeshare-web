import { GetServerSideProps, NextPage } from "next";
import { kv } from "@vercel/kv";
import Layout from "@/components/Layout";
import CodeViewer from "@/components/CodeViewer";

interface Snippet {
  code: string;
  language: string;
}

interface Props {
  snippet: Snippet | null;
  error?: string;
}

const SnippetPage: NextPage<Props> = ({ snippet, error }) => {
  return (
    <Layout
      title={error ? "Codeshare - Error" : "Codeshare Snippet"}
      description="A shared code snippet from Codeshare."
    >
      <div className="flex min-h-screen items-center justify-center py-8">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <CodeViewer
              title={error ? "Error" : `Language: ${snippet?.language || "plaintext"}`}
              code={snippet?.code || null}
              language={snippet?.language || null}
              error={error}
              className="max-w-5xl"
            />
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
