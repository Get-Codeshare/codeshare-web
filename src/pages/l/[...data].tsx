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

// This is the main component for our page
const LinkPage: NextPage<Props> = ({ linkData, errorCode }) => {
  const [fallbackVisible, setFallbackVisible] = useState(false);
  const [code, setCode] = useState<string | null>('Loading code...');

  useEffect(() => {
    if (!linkData) return;

    // The core magic: try to open the VS Code link
    window.location.href = linkData.vscodeUri;

    // If after 500ms the page is still visible, the redirect failed.
    // So, we show the fallback UI.
    const timer = setTimeout(() => {
      setFallbackVisible(true);
      // Fetch the raw code from GitHub/GitLab to display it
      fetch(linkData.rawCodeUrl)
        .then(res => res.text())
        .then(text => {
          // Extract only the lines we need
          const linesArr = text.split('\n');
          const [start, end] = linkData.lines.split('-').map(Number);
          const relevantLines = linesArr.slice(start - 1, end).join('\n');
          setCode(relevantLines);
        })
        .catch(() => setCode('Could not fetch code. The repository might be private.'));
    }, 500);

    return () => clearTimeout(timer); // Cleanup timer
  }, [linkData]);

  if (errorCode) {
    return <div>Error: Invalid link format.</div>;
  }

  if (!fallbackVisible) {
    return <div>Redirecting to VS Code...</div>;
  }

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem', backgroundColor: '#282c34', minHeight: '100vh', color: 'white' }}>
      <Head>
        <title>Codeshare: {linkData?.file}</title>
      </Head>
      <h1>Codeshare</h1>
      <p>Could not redirect to VS Code.</p>
      <a href="https://marketplace.visualstudio.com/items?itemName=sarthak.codeshare" target="_blank" rel="noopener noreferrer" style={{ color: '#61dafb' }}>
        Install the Codeshare extension to open links automatically.
      </a>
      <hr style={{ margin: '2rem 0' }} />
      <h3>{linkData?.file} (Lines {linkData?.lines})</h3>
      <div style={{ fontSize: '0.9em', border: '1px solid #444', borderRadius: '4px', overflow: 'hidden' }}>
        <SyntaxHighlighter language="auto" style={atomOneDark} showLineNumbers={true} startingLineNumber={parseInt(linkData?.lines.split('-')[0] || '1')}>
            {code || ''}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

// This function runs on the server before the page is sent to the browser.
// It parses the URL and prepares the data.
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data } = context.params!;
  if (!Array.isArray(data) || data.length < 3) {
    return { props: { linkData: null, errorCode: 400 } };
  }

  // Our link format will be: /l/{repo}/{file}/{lines}
  // We'll base64url-encode them to be URL-safe
  const [repoB64, fileB64, lines] = data;
  const repo = Buffer.from(repoB64, 'base64url').toString('utf8');
  const file = Buffer.from(fileB64, 'base64url').toString('utf8');

  const extensionId = 'sarthak.codeshare'; // Your publisher.name
  const vscodeUri = `vscode://${extensionId}/open?repo=${encodeURIComponent(repo)}&file=${encodeURIComponent(file)}&lines=${lines}`;
  
  // Construct a URL to fetch the raw code (works for public GitHub repos)
  const rawCodeUrl = `${repo}/raw/main/${file}`; // Note: This assumes 'main' branch

  const linkData: LinkData = { repo, file, lines, vscodeUri, rawCodeUrl };

  return {
    props: {
      linkData,
    },
  };
};

export default LinkPage;