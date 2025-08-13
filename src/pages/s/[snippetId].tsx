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
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-neutral-100 to-neutral-400 pb-2">
        Codeshare Snippet
      </h1>
      <p className="max-w-xl mt-2 text-lg text-neutral-400">
        This is a temporary code snippet shared via Codeshare.
      </p>

      <CodeViewer
        title={error ? "Error" : `Snippet (${snippet?.language || 'plaintext'})`}
        code={snippet?.code || null}
        language={snippet?.language || null}
        error={error}
      />
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