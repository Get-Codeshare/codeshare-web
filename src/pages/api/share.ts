// File: codeshare-web/src/pages/api/share.ts
// Version: MODIFIED

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
    const {
      code,
      language = "plaintext",
      repo,
      branch,
      file,
      lines,
    } = req.body;

    if (!code || typeof code !== "string" || code.trim() === "") {
      return res.status(400).json({ error: "Code snippet cannot be empty." });
    }

    const snippetData = {
      code,
      language,
      repo,
      branch,
      file,
      lines,
    };
    const snippetId = nanoid(8);

    await kv.set(snippetId, snippetData, { ex: 86400 });

    return res.status(200).json({ id: snippetId });
  } catch (error: unknown)
   {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("[API Error] The /api/share route failed:", errorMessage);
    return res
      .status(500)
      .json({ error: "Failed to create snippet due to a server error." });
  }
}

export default allowCors(handler);