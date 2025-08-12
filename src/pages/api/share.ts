// src/pages/api/share.ts
import { kv } from '@vercel/kv';
import { NextApiRequest, NextApiResponse } from 'next';
import { nanoid } from 'nanoid'; // `npm install nanoid`

// We expect a POST request with the code and language
interface SharePayload {
  code: string;
  language?: string;
}

// --- HELPER FUNCTION TO SET CORS HEADERS ---
const allowCors = (fn: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) => async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  // We can be specific or allow all origins for simplicity during development
  res.setHeader('Access-Control-Allow-Origin', '*')
  // Or more securely: res.setHeader('Access-Control-Allow-Origin', 'vscode-file://vscode-app')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // Handle preflight requests (sent by browsers to check permissions)
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { code, language = 'plaintext' } = req.body as SharePayload;

    if (!code) {
      return res.status(400).json({ error: 'Code snippet cannot be empty.' });
    }

    // Generate a short, unique ID for this snippet
    const snippetId = nanoid(8); // e.g., 'yCw8_SoC'
    const snippetData = { code, language };
    
    // Store the snippet in Vercel KV with a 24-hour expiration (86400 seconds)
    await kv.set(snippetId, JSON.stringify(snippetData), { ex: 86400 });

    // Return the ID to the client
    return res.status(200).json({ id: snippetId });

  } catch (error) {
    console.error('Error creating snippet:', error);
    return res.status(500).json({ error: 'Failed to create snippet.' });
  }
}

// Wrap the handler with the CORS middleware
export default allowCors(handler);