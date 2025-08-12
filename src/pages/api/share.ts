// File: codeshare-web/src/pages/api/share.ts
// Version: Drastic Debug Test v1

import { kv } from '@vercel/kv';
import type { NextApiRequest, NextApiResponse } from 'next';
import { nanoid } from 'nanoid';

// CORS Middleware (no changes needed here)
const allowCors = (fn: (req: NextApiRequest, res: NextApiResponse) => Promise<void> | void) => async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') { res.status(200).end(); return }
  return await fn(req, res)
}

async function handler(
  _req: NextApiRequest,
  res: NextApiResponse,
) {
  // This unique log message proves the new code is running.
  console.log("--- RUNNING DRASTIC DEBUG TEST v1 ---");

  try {
    const snippetId = nanoid(8);
    
    // 1. Create a hardcoded, guaranteed-to-be-correct object.
    const hardcodedData = {
        code: "If you are seeing this text, the deployment was successful.",
        language: "plaintext"
    };

    // 2. Create a hardcoded, guaranteed-to-be-correct JSON string.
    const hardcodedJsonString = JSON.stringify(hardcodedData);

    console.log(`[DRASTIC DEBUG] Storing this exact string: ${hardcodedJsonString}`);
    
    // 3. Store the hardcoded string.
    await kv.set(snippetId, hardcodedJsonString, { ex: 120 }); // 2-minute expiry
    
    console.log(`[DRASTIC DEBUG] Stored successfully with ID: ${snippetId}`);

    // 4. Return the ID to the client.
    return res.status(200).json({ id: snippetId });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('[DRASTIC DEBUG] A fatal error occurred:', errorMessage);
    return res.status(500).json({ error: 'The drastic debug test failed.' });
  }
}

export default allowCors(handler);