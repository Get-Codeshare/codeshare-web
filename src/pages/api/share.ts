// File: codeshare-web/src/pages/api/share.ts
// Version: FINAL

import { kv } from "@vercel/kv";
import type { NextApiRequest, NextApiResponse } from "next";
import { nanoid } from "nanoid";

// CORS Middleware
const allowCors =
  (fn: (req: NextApiRequest, res: NextApiResponse) => Promise<void> | void) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") {
      res.status(200).end();
      return;
    }
    return await fn(req, res);
  };

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { code, language = "plaintext" } = req.body;

    if (!code || typeof code !== "string" || code.trim() === "") {
      return res.status(400).json({ error: "Code snippet cannot be empty." });
    }

    const snippetData = { code, language };
    const snippetId = nanoid(8);

    // --- THE FINAL FIX ---
    // Pass the JavaScript OBJECT directly to kv.set.
    // Let the @vercel/kv library handle the serialization.
    await kv.set(snippetId, snippetData, { ex: 86400 });
    // --- END OF FIX ---

    return res.status(200).json({ id: snippetId });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("[API Error] The /api/share route failed:", errorMessage);
    return res
      .status(500)
      .json({ error: "Failed to create snippet due to a server error." });
  }
}

export default allowCors(handler);
