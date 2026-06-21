import { useEffect, useState } from "react";

const VISITOR_ID_KEY = "portfolio_visitor_id";
const LAST_COUNT_KEY = "portfolio_last_visitor_count";

let visitRequest = null;

function createVisitorId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function readCachedCount() {
  try {
    const cachedCount = Number(localStorage.getItem(LAST_COUNT_KEY) || 0);
    return Number.isFinite(cachedCount) && cachedCount >= 0 ? cachedCount : 0;
  } catch {
    return 0;
  }
}

function getVisitorId() {
  try {
    let visitorId = localStorage.getItem(VISITOR_ID_KEY);

    if (!visitorId) {
      visitorId = createVisitorId();
      localStorage.setItem(VISITOR_ID_KEY, visitorId);
    }

    return visitorId;
  } catch {
    return createVisitorId();
  }
}

function registerVisit() {
  if (visitRequest) return visitRequest;

  const visitorId = getVisitorId();

  visitRequest = fetch("/api/visitor-count", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ visitorId }),
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error("Visitor counter request failed");
      }

      const data = await response.json();
      const count = typeof data.count === "number" ? data.count : null;

      if (count === null || !Number.isFinite(count) || count < 0) {
        throw new Error("Visitor counter returned an invalid count");
      }

      try {
        localStorage.setItem(LAST_COUNT_KEY, String(count));
      } catch {
        // The live count can still render when storage is unavailable.
      }

      return count;
    });

  return visitRequest;
}

export function useVisitorCount() {
  const [count, setCount] = useState(null);
  const [previousCount] = useState(readCachedCount);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    registerVisit()
      .then((nextCount) => {
        if (!cancelled) setCount(nextCount);
      })
      .catch((requestError) => {
        if (!cancelled) {
          setError(requestError);
          setCount(null);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { count, previousCount, loading, error };
}
