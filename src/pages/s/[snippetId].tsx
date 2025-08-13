import { GetServerSideProps, NextPage } from "next";
import { kv } from "@vercel/kv";
import Layout from "@/components/Layout";
import CodeViewer from "@/components/CodeViewer";
import BlueprintCard from "@/components/BlueprintCard";

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
      <div className="container mx-auto px-4 py-24 flex justify-center">
        <BlueprintCard className="w-full max-w-5xl">
          <div className="text-center">
            <h1 className="font-audiowide text-2xl md:text-3xl tracking-tighter">
              Shared Snippet
            </h1>
            <p className="max-w-xl mx-auto mt-2 text-neutral-600">
              This is a temporary code snippet. It will expire after 24 hours.
            </p>
          </div>

          <CodeViewer
            title={error ? "Error" : `Language: ${snippet?.language || 'plaintext'}`}
            code={snippet?.code || null}
            language={snippet?.language || null}
            error={error}
          />
        </BlueprintCard>
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