import { GetServerSideProps, NextPage } from 'next';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

interface LinkData {
  repo: string;
  file: string;
  lines: string;
  vscodeUri: string;
  rawCodeUrl: string;
}

interface Props {
  linkData: LinkData | null;
  errorCode?: number;
}

// This is our new, styled component
const LinkPage: NextPage<Props> = ({ linkData, errorCode }) => {
  const [fallbackVisible, setFallbackVisible] = useState(false);
  const [code, setCode] = useState<string | null>('Loading code...');
  const [copyText, setCopyText] = useState('Copy');

  useEffect(() => {
    if (!linkData) return;
    // The core magic: try to open the VS Code link
    window.location.href = linkData.vscodeUri;
    // If that fails, show the fallback UI
    const timer = setTimeout(() => {
      setFallbackVisible(true);
      fetch(linkData.rawCodeUrl)
        .then(res => res.ok ? res.text() : Promise.reject(`Failed to fetch: ${res.statusText}`))
        .then(text => {
          const linesArr = text.split('\n');
          const [start, end] = linkData.lines.split('-').map(Number);
          const relevantLines = linesArr.slice(start - 1, end).join('\n');
          setCode(relevantLines);
        })
        .catch(() => setCode('Could not fetch code. The repository might be private or the branch/file does not exist.'));
    }, 500);
    return () => clearTimeout(timer);
  }, [linkData]);

  // --- New "Copy" button handler ---
  const handleCopy = () => {
    if (code) {
      navigator.clipboard.writeText(code);
      setCopyText('Copied!');
      setTimeout(() => setCopyText('Copy'), 2000);
    }
  };

  if (errorCode) {
    return <div style={styles.container}>Error: Invalid link format.</div>;
  }

  if (!fallbackVisible) {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>Codeshare</h1>
        <p>Redirecting to VS Code...</p>
      </div>
    );
  }

  // --- The new, styled fallback UI ---
  return (
    <div style={styles.container}>
      <Head>
        <title>Codeshare: {linkData?.file}</title>
      </Head>

      <div style={styles.mainContent}>
        <h1 style={styles.title}>Codeshare</h1>
        <p style={styles.subtitle}>Could not redirect to VS Code.</p>
        <a href="https://marketplace.visualstudio.com/items?itemName=sarthak.codeshare" target="_blank" rel="noopener noreferrer" style={styles.installButton}>
          Install VS Code Extension
        </a>

        <div style={styles.codeCard}>
          <div style={styles.codeCardHeader}>
            <span style={styles.fileName}>{linkData?.file} (Lines {linkData?.lines})</span>
            <button onClick={handleCopy} style={styles.copyButton}>{copyText}</button>
          </div>
          <SyntaxHighlighter
            language="auto"
            style={atomOneDark}
            showLineNumbers={true}
            startingLineNumber={parseInt(linkData?.lines.split('-')[0] || '1')}
            customStyle={{ margin: 0, borderRadius: '0 0 8px 8px' }}
          >
            {code || ''}
          </SyntaxHighlighter>
        </div>
        <footer style={styles.footer}>
            <a href="https://github.com/Sarthakischill/codeshare-project" target="_blank" rel="noopener noreferrer" style={styles.footerLink}>
                View on GitHub
            </a>
        </footer>
      </div>
    </div>
  );
};

// --- A simple CSS-in-JS object for our styles ---
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#202124',
    color: '#e8eaed',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    padding: '2rem',
  },
  mainContent: {
    width: '100%',
    maxWidth: '800px',
    textAlign: 'center',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 700,
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#bdc1c6',
    marginBottom: '2rem',
  },
  installButton: {
    display: 'inline-block',
    backgroundColor: '#8ab4f8',
    color: '#202124',
    padding: '12px 24px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: '1rem',
    transition: 'opacity 0.2s',
  },
  codeCard: {
    marginTop: '3rem',
    border: '1px solid #5f6368',
    borderRadius: '8px',
    textAlign: 'left',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  },
  codeCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    backgroundColor: '#3c4043',
    borderBottom: '1px solid #5f6368',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
  },
  fileName: {
    fontSize: '0.9rem',
    fontFamily: 'monospace',
  },
  copyButton: {
    backgroundColor: '#5f6368',
    color: '#e8eaed',
    border: 'none',
    borderRadius: '4px',
    padding: '6px 12px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'background-color 0.2s',
  },
  footer: {
    marginTop: '3rem',
    fontSize: '0.9rem',
    color: '#9aa0a6',
  },
  footerLink: {
    color: '#8ab4f8',
    textDecoration: 'none',
  },
};

// (getServerSideProps function remains exactly the same)
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data } = context.params!;
  if (!Array.isArray(data) || data.length < 3) {
    return { props: { linkData: null, errorCode: 400 } };
  }
  const [repoB64, fileB64, lines] = data;
  const repo = Buffer.from(repoB64, 'base64url').toString('utf8');
  const file = Buffer.from(fileB64, 'base64url').toString('utf8');
  const extensionId = 'sarthak.codeshare';
  const vscodeUri = `vscode://${extensionId}/open?repo=${encodeURIComponent(repo)}&file=${encodeURIComponent(file)}&lines=${lines}`;
  const rawCodeUrl = `${repo}/raw/main/${file}`;
  const linkData: LinkData = { repo, file, lines, vscodeUri, rawCodeUrl };
  return {
    props: {
      linkData,
    },
  };
};

export default LinkPage;