import { kv } from '@vercel/kv';
import type { NextApiRequest, NextApiResponse } from 'next';
import { nanoid } from 'nanoid';

// --- HELPER FUNCTION TO SET CORS HEADERS ---
const allowCors = (fn: (req: NextApiRequest, res: NextApiResponse) => Promise<void> | void) => async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*') // Allow all origins
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // Handle preflight requests
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
  // The method check is now implicitly handled by the middleware for OPTIONS
  if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { code, language = 'plaintext' } = req.body;

    if (!code || typeof code !== 'string' || code.trim() === '') {
      return res.status(400).json({ error: 'Code snippet must be a non-empty string.' });
    }

    const snippetId = nanoid(8);
    const snippetData = { code, language };
    
    // Store in Vercel KV for 24 hours (86400 seconds)
    await kv.set(snippetId, JSON.stringify(snippetData), { ex: 86400 });

    return res.status(200).json({ id: snippetId });

  } catch (error) {
    console.error('API Error in /api/share:', error);
    return res.status(500).json({ error: 'Failed to create snippet due to a server error.' });
  }
}

// Wrap the main handler with the CORS middleware
export default allowCors(handler);