// src/pages/s/[snippetId].tsx
import { GetServerSideProps, NextPage } from "next";
import { kv } from "@vercel/kv";
import Head from "next/head";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { useState } from "react";

interface Snippet {
  code: string;
  language: string;
}

interface Props {
  snippet: Snippet | null;
  error?: string;
}

const SnippetPage: NextPage<Props> = ({ snippet, error }) => {
  const [copyText, setCopyText] = useState("Copy");

  const handleCopy = () => {
    if (snippet?.code) {
      navigator.clipboard.writeText(snippet.code);
      setCopyText("Copied!");
      setTimeout(() => setCopyText("Copy"), 2000);
    }
  };

  if (error) {
    return (
      <div style={styles.container}>
        <Head>
          <title>Codeshare - Error</title>
        </Head>
        <div style={styles.mainContent}>
          <h1 style={styles.title}>Codeshare</h1>
          <div style={styles.errorContainer}>
            <p style={{ margin: 0 }}>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <Head>
        <title>Codeshare Snippet</title>
      </Head>
      <div style={styles.mainContent}>
        <h1 style={styles.title}>Codeshare</h1>
        <p style={styles.subtitle}>Shared code snippet</p>

        <div style={styles.codeCard}>
          <div style={styles.codeCardHeader}>
            <span
              style={styles.fileName}
            >{`Snippet (${snippet?.language})`}</span>
            <button onClick={handleCopy} style={styles.copyButton}>
              {copyText}
            </button>
          </div>
          <SyntaxHighlighter
            language={snippet?.language}
            style={atomOneDark}
            customStyle={{ margin: 0, borderRadius: "0 0 8px 8px" }}
          >
            {snippet?.code || ""}
          </SyntaxHighlighter>
        </div>

        <footer style={styles.footer}>
          <a
            href="https://github.com/Sarthakischill/codeshare-project"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.footerLink}
          >
            View on GitHub
          </a>
        </footer>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { snippetId } = context.params!;

  if (typeof snippetId !== "string") {
    return { props: { snippet: null, error: "Invalid snippet ID format." } };
  }

  try {
    console.log(`[SNIPPET PAGE] Attempting to retrieve key: ${snippetId}`);

    // 1. Get the data. kv.get() will auto-parse it into an object for us.
    const snippet: Snippet | null = await kv.get(snippetId);
    console.log(`[SNIPPET PAGE] Data received from KV:`, snippet);

    if (!snippet) {
      console.error(`[SNIPPET PAGE] No data found for key: ${snippetId}`);
      return {
        props: { snippet: null, error: "Snippet not found or has expired." },
      };
    }

    // 2. NO MORE JSON.parse()! The 'snippet' variable is already the object we need.
    // We pass it directly to the page props.
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

// Reuse the same styles from the Git-aware page
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#202124",
    color: "#e8eaed",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    padding: "2rem",
  },
  mainContent: {
    width: "100%",
    maxWidth: "800px",
    textAlign: "center",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: 700,
    marginBottom: "0.5rem",
  },
  subtitle: {
    fontSize: "1.2rem",
    color: "#bdc1c6",
    marginBottom: "2rem",
  },
  codeCard: {
    marginTop: "3rem",
    border: "1px solid #5f6368",
    borderRadius: "8px",
    textAlign: "left",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  },
  codeCardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 16px",
    backgroundColor: "#3c4043",
    borderBottom: "1px solid #5f6368",
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
  },
  fileName: {
    fontSize: "0.9rem",
    fontFamily: "monospace",
  },
  copyButton: {
    backgroundColor: "#5f6368",
    color: "#e8eaed",
    border: "none",
    borderRadius: "4px",
    padding: "6px 12px",
    cursor: "pointer",
    fontSize: "0.9rem",
    transition: "background-color 0.2s",
  },
  footer: {
    marginTop: "3rem",
    fontSize: "0.9rem",
    color: "#9aa0a6",
  },
  footerLink: {
    color: "#8ab4f8",
    textDecoration: "none",
  },
  errorContainer: {
    padding: "16px 20px",
    backgroundColor: "#2d2d2d",
    color: "#ff9a9a",
    fontFamily: "monospace",
    fontSize: "0.9rem",
    borderRadius: "8px",
    textAlign: "center",
    border: "1px solid #5f6368",
  },
};

export default SnippetPage;
