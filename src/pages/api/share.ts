// File: codeshare-web/src/pages/api/share.ts
// Version: Ultimate Debug

import { kv } from '@vercel/kv';
import type { NextApiRequest, NextApiResponse } from 'next';
import { nanoid } from 'nanoid';

// CORS Middleware - this part is working correctly, so we keep it.
const allowCors = (fn: (req: NextApiRequest, res: NextApiResponse) => Promise<void> | void) => async (req: NextApiRequest, res: NextApiResponse) => {
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
  // --- Start of Heavy Logging ---
  console.log("--- [DEBUG] /api/share handler started. ---");
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    console.log(`[DEBUG] Type of request body (req.body): ${typeof req.body}`);
    console.log(`[DEBUG] Value of request body:`, req.body);

    const { code, language = 'plaintext' } = req.body;

    const snippetData = { code, language };
    console.log(`[DEBUG] Type of snippetData object: ${typeof snippetData}`);
    console.log(`[DEBUG] Value of snippetData object:`, snippetData);

    const jsonStringToStore = JSON.stringify(snippetData);
    console.log(`[DEBUG] Type of jsonStringToStore: ${typeof jsonStringToStore}`);
    console.log(`[DEBUG] Value of jsonStringToStore that will be saved to KV:`, jsonStringToStore);

    const snippetId = nanoid(8);
    
    // Using the explicitly created string variable
    await kv.set(snippetId, jsonStringToStore, { ex: 86400 });
    
    console.log(`[DEBUG] Successfully stored data in KV with ID: ${snippetId}`);
    // --- End of Heavy Logging ---

    return res.status(200).json({ id: snippetId });

  } catch (error: unknown) {
    // Log the server-side error with more detail
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    console.error('[FATAL DEBUG] Error caught in /api/share:', errorMessage, errorStack);
    return res.status(500).json({ error: 'Failed to create snippet due to a fatal server error.' });
  }
}

export default allowCors(handler);