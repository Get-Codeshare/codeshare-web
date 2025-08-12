import { GetServerSideProps, NextPage } from 'next';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

interface LinkData {
  repo: string;
  branch: string; // Added branch
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
  const [fetchError, setFetchError] = useState<string | null>(null); // New state for errors
  const [copyText, setCopyText] = useState('Copy');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!linkData) return;
    // The core magic: try to open the VS Code link
    window.location.href = linkData.vscodeUri;
    // If that fails, show the fallback UI
    const timer = setTimeout(() => {
      setFallbackVisible(true);
      fetch(linkData.rawCodeUrl)
        .then(res => {
          if (!res.ok) {
            // Provide a more specific error message for 404
            if (res.status === 404) {
              return Promise.reject('Error: File not found. The repository may be private, the branch could be incorrect, or the file path may have changed.');
            }
            return Promise.reject(`Could not fetch code. (HTTP ${res.status})`);
          }
          return res.text();
        })
        .then(text => {
          const linesArr = text.split('\n');
          const [start, end] = linkData.lines.split('-').map(Number);
          const relevantLines = linesArr.slice(start - 1, end).join('\n');
          setCode(relevantLines);
          setFetchError(null); // Clear any previous errors on success
        })
        .catch((error: Error) => {
            // Set the dedicated error state on failure
            setCode(null);
            setFetchError(error.toString());
        });
    }, 500);
    return () => clearTimeout(timer);
  }, [linkData]);

  // --- New "Copy" button handler ---
  const handleCopy = () => {
    // Only copy if there is code and no error
    if (code && !fetchError) {
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
        <a href="https://marketplace.visualstudio.com/items?itemName=Sarthakischill.codeshare-by-sarthak" target="_blank" rel="noopener noreferrer" style={styles.installButton}>
          Install VS Code Extension
        </a>

        <div style={styles.codeCard}>
          <div style={styles.codeCardHeader}>
            <span style={styles.fileName}>{linkData?.file} (Lines {linkData?.lines})</span>
            <button onClick={handleCopy} style={styles.copyButton} disabled={!!fetchError || !code}>
                {copyText}
            </button>
          </div>
          {fetchError ? (
            <div style={styles.errorContainer}>
              <p style={{margin: 0}}>{fetchError}</p>
            </div>
          ) : (
            <SyntaxHighlighter
              language="auto"
              style={atomOneDark}
              showLineNumbers={true}
              startingLineNumber={parseInt(linkData?.lines.split('-')[0] || '1')}
              customStyle={{ margin: 0, borderRadius: '0 0 8px 8px' }}
            >
              {code || ''}
            </SyntaxHighlighter>
          )}
        </div>

        {/* --- New "View on GitHub" Link --- */}
        {linkData && (
          <a
            href={`${linkData.repo}/blob/${linkData.branch}/${linkData.file}#L${linkData.lines.split('-')[0]}-L${linkData.lines.split('-')[1]}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{...styles.githubLink, backgroundColor: isHovered ? '#3c4043' : 'transparent'}}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            View on GitHub
          </a>
        )}

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
  githubLink: { // New style rule
    display: 'inline-block',
    marginTop: '1.5rem',
    color: '#8ab4f8',
    textDecoration: 'none',
    fontSize: '1rem',
    border: '1px solid #5f6368',
    padding: '10px 20px',
    borderRadius: '8px',
    transition: 'background-color 0.2s',
  },
  errorContainer: { // New style rule
    padding: '16px 20px',
    backgroundColor: '#2d2d2d',
    color: '#ff9a9a', // A soft red for error text
    fontFamily: 'monospace',
    fontSize: '0.9rem',
    borderRadius: '0 0 8px 8px',
    textAlign: 'center',
  },
};

// (getServerSideProps function remains exactly the same)
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data } = context.params!;
  // Expect 4 parts now: repo, branch, file, lines
  if (!Array.isArray(data) || data.length < 4) {
    return { props: { linkData: null, errorCode: 400 } };
  }

  const [repoB64, branchB64, fileB64, lines] = data;

  const repo = Buffer.from(repoB64, 'base64url').toString('utf8');
  const branch = Buffer.from(branchB64, 'base64url').toString('utf8'); // Decode branch
  const file = Buffer.from(fileB64, 'base64url').toString('utf8');

  const extensionId = 'Sarthakischill.codeshare-by-sarthak';
  const vscodeUri = `vscode://${extensionId}/open?repo=${encodeURIComponent(repo)}&file=${encodeURIComponent(file)}&lines=${lines}`;
  
  // --- THIS IS THE FIX ---
  // Before (Incorrect): const rawCodeUrl = `${repo}/raw/${branch}/${file}`;
  
  // After (Correct):
  // 1. Get the path part of the repo URL (e.g., Sarthakischill/codeshare-project)
  const repoPath = repo.replace('https://github.com/', '');
  // 2. Construct the direct raw content URL
  const rawCodeUrl = `https://raw.githubusercontent.com/${repoPath}/${branch}/${file}`;

  const linkData: LinkData = { repo, branch, file, lines, vscodeUri, rawCodeUrl };

  return {
    props: {
      linkData,
    },
  };
};

export default LinkPage;