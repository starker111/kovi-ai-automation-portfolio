import { useEffect, useState } from "react";
import { useVisitorCount } from "../hooks/useVisitorCount.js";

function useAnimatedNumber(target, start = 0, duration = 1650) {
  const [value, setValue] = useState(start);

  useEffect(() => {
    if (typeof target !== "number") return undefined;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion || target === start) {
      setValue(target);
      return undefined;
    }

    const from = Number.isFinite(start) ? start : 0;
    const startTime = performance.now();
    let animationFrame = 0;

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 5);
      setValue(Math.round(from + (target - from) * eased));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(tick);
      }
    };

    animationFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, start, duration]);

  return value;
}

export default function VisitorCounter({ className = "" }) {
  const { count, previousCount, loading, error } = useVisitorCount();
  const targetCount = typeof count === "number" ? count : previousCount;
  const animatedCount = useAnimatedNumber(targetCount, previousCount, 1650);
  const increased =
    typeof count === "number" &&
    typeof previousCount === "number" &&
    count > previousCount;

  const accessibleLabel =
    typeof count === "number"
      ? `Viewed by ${count} unique visitors`
      : error
        ? "Visitor count temporarily unavailable"
      : "Tracking unique visits";

  return (
    <span
      className={`visitor-counter ${increased ? "visitor-counter-new" : ""} ${error ? "visitor-counter-error" : ""} ${className}`.trim()}
      title="Counts unique browsers/devices, not personal identities."
      aria-label={accessibleLabel}
    >
      <span className="visitor-counter-orb" aria-hidden="true" />
      <span className="visitor-counter-copy" aria-hidden="true">
        <span className="visitor-counter-label">Live portfolio reach</span>
        <span className="visitor-counter-main">
          {error ? (
            "Visitor count temporarily unavailable"
          ) : loading || count === null ? (
            "Tracking unique visits"
          ) : (
            <>
              <span className="visitor-counter-number-window">
                <strong
                  className="visitor-counter-number"
                  key={animatedCount}
                >
                  {animatedCount.toLocaleString()}
                </strong>
              </span>
              <span>unique visitors</span>
            </>
          )}
        </span>
      </span>
      {increased ? (
        <span className="visitor-counter-spark" aria-hidden="true">
          +1
        </span>
      ) : null}
    </span>
  );
}
