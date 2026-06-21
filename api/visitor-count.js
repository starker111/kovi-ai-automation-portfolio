import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase =
  supabaseUrl && supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      })
    : null;

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    if (!supabase) {
      return res.status(500).json({ error: "Visitor counter is not configured" });
    }

    const { visitorId } = req.body || {};
    const normalizedVisitorId =
      typeof visitorId === "string" ? visitorId.trim() : "";

    if (
      normalizedVisitorId.length < 10 ||
      normalizedVisitorId.length > 128 ||
      !/^[a-zA-Z0-9_-]+$/.test(normalizedVisitorId)
    ) {
      return res.status(400).json({ error: "Invalid visitor id" });
    }

    const { data, error } = await supabase.rpc("register_portfolio_visit", {
      p_visitor_id: normalizedVisitorId,
    });

    if (error) {
      console.error("Visitor counter error:", error.message);
      return res.status(500).json({ error: "Could not update visitor count" });
    }

    const count = Number(data);

    if (!Number.isFinite(count) || count < 0) {
      return res.status(500).json({ error: "Could not update visitor count" });
    }

    return res.status(200).json({ count });
  } catch (error) {
    console.error("Visitor counter server error:", error);
    return res.status(500).json({ error: "Could not update visitor count" });
  }
}
