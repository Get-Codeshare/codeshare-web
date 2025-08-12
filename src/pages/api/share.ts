import { kv } from '@vercel/kv';
import type { NextApiRequest, NextApiResponse } from 'next';
import { nanoid } from 'nanoid';

const allowCors = (fn: (req: NextApiRequest, res: NextApiResponse) => Promise<void> | void) => async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

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
    const { code, language = 'plaintext' } = req.body;

    if (!code || typeof code !== 'string' || code.trim() === '') {
      return res.status(400).json({ error: 'Code snippet cannot be empty.' });
    }

    // This is the data we want to store
    const snippetData = { code, language };
    const snippetId = nanoid(8);
    
    // --- THIS IS THE CRITICAL LINE ---
    // We MUST stringify the object into a valid JSON string before setting it.
    await kv.set(snippetId, JSON.stringify(snippetData), { ex: 86400 });
    // --- END OF CRITICAL LINE ---

    return res.status(200).json({ id: snippetId });

  } catch (error) {
    // This console.error will show up in your Vercel logs for debugging.
    console.error('API Error in /api/share:', error);
    return res.status(500).json({ error: 'Failed to create snippet due to a server error.' });
  }
}

export default allowCors(handler);