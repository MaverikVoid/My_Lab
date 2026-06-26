"use client";

import { useEffect, useRef, useState } from "react";

interface ActiveConnection {
  concept: string;
  sourceRect: DOMRect;
  targets: { id: string; rect: DOMRect }[];
  startTime: number;
  duration: number; // in ms
  fadeOut: boolean;
}

const relationshipMap: Record<string, string[]> = {
  "optimization": ["scientific-ml", "finance", "systems", "control-theory"],
  "scientific-ml": ["pdes", "neural-operators", "optimization", "scientific-computing"],
  "neural-operators": ["pdes", "mathematics", "scientific-ml"]
};

export default function ConceptLinkOverlay() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const activeConnection = useRef<ActiveConnection | null>(null);
  const isTabActive = useRef(true);
  const [isEnabled, setIsEnabled] = useState(false);

  // 1. Separate listener for user settings and platform status
  useEffect(() => {
    const checkEnabled = () => {
      const hasReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isTouch = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
      const isSmallScreen = window.innerWidth < 768;
      const disabledByUser = localStorage.getItem("custom-cursor-disabled") === "true";

      if (hasReducedMotion || isTouch || isSmallScreen || disabledByUser) {
        setIsEnabled(false);
      } else {
        setIsEnabled(true);
      }
    };

    checkEnabled();
    window.addEventListener("cursor-toggle", checkEnabled);
    window.addEventListener("resize", checkEnabled);

    return () => {
      window.removeEventListener("cursor-toggle", checkEnabled);
      window.removeEventListener("resize", checkEnabled);
    };
  }, []);

  useEffect(() => {
    if (!isEnabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Track active tab state
    const handleVisibilityChange = () => {
      isTabActive.current = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Event Delegation: Listen to hovers on words with data-concept
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const conceptElement = target.closest("[data-concept]");
      
      if (conceptElement) {
        const concept = conceptElement.getAttribute("data-concept") || "";
        const related = relationshipMap[concept];
        
        if (related) {
          // Scan screen for related concept tags
          const targets: { id: string; rect: DOMRect }[] = [];
          related.forEach((tId) => {
            const elements = document.querySelectorAll(`[data-concept="${tId}"]`);
            elements.forEach((el) => {
              // Only link to elements currently visible in viewport
              const rect = el.getBoundingClientRect();
              const isVisible =
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= window.innerHeight &&
                rect.right <= window.innerWidth;
              
              if (isVisible) {
                targets.push({ id: tId, rect });
              }
            });
          });

          if (targets.length > 0) {
            activeConnection.current = {
              concept,
              sourceRect: conceptElement.getBoundingClientRect(),
              targets,
              startTime: performance.now(),
              duration: 900, // 900ms pulse
              fadeOut: false
            };
          }
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const conceptElement = target.closest("[data-concept]");
      if (conceptElement && activeConnection.current) {
        // Start fading connections out when mouse leaves word
        activeConnection.current.fadeOut = true;
      }
    };

    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    // 60 FPS Render Loop
    const render = () => {
      if (!isTabActive.current) {
        animFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const conn = activeConnection.current;
      if (conn) {
        const elapsed = performance.now() - conn.startTime;
        let progress = Math.min(elapsed / conn.duration, 1);

        // Calculate opacity: fade-in fast, fade-out slow
        let alpha = 1;
        if (conn.fadeOut) {
          alpha = Math.max(0, alpha - 0.08); // fade out on leave
        } else {
          // Fades out automatically after duration limit
          if (progress > 0.8) {
            alpha = (1 - progress) / 0.2;
          }
        }

        if (alpha <= 0 || progress >= 1) {
          activeConnection.current = null;
        } else {
          const sx = conn.sourceRect.left + conn.sourceRect.width / 2;
          const sy = conn.sourceRect.top + conn.sourceRect.height / 2;
          const dark = document.documentElement.classList.contains("dark");
          
          // Draw connections
          conn.targets.forEach((t) => {
            const tx = t.rect.left + t.rect.width / 2;
            const ty = t.rect.top + t.rect.height / 2;

            // 1. Draw the connection path line
            ctx.beginPath();
            ctx.strokeStyle = dark
              ? `rgba(56, 189, 248, ${alpha * 0.12})`
              : `rgba(15, 76, 129, ${alpha * 0.1})`;
            ctx.lineWidth = 0.65;
            ctx.moveTo(sx, sy);
            // Draw line up to progress percentage (animation growing outwards)
            const cx = sx + (tx - sx) * Math.min(progress * 1.5, 1);
            const cy = sy + (ty - sy) * Math.min(progress * 1.5, 1);
            ctx.lineTo(cx, cy);
            ctx.stroke();

            // 2. Draw a tiny signal dot propagating along the link path
            const dotProgress = (progress * 1.25) % 1.0;
            const dx = sx + (tx - sx) * dotProgress;
            const dy = sy + (ty - sy) * dotProgress;

            ctx.beginPath();
            ctx.fillStyle = dark
              ? `rgba(56, 189, 248, ${alpha * 0.4})`
              : `rgba(15, 76, 129, ${alpha * 0.35})`;
            ctx.arc(dx, dy, 1, 0, Math.PI * 2);
            ctx.fill();
          });

          // 3. Draw a faint halo pulse surrounding the source element
          ctx.beginPath();
          ctx.strokeStyle = dark
            ? `rgba(56, 189, 248, ${alpha * 0.15})`
            : `rgba(15, 76, 129, ${alpha * 0.12})`;
          ctx.lineWidth = 0.5;
          ctx.arc(sx, sy, (conn.sourceRect.width / 2) + progress * 20, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      animFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(animFrameId);
    };
  }, [isEnabled]);

  if (!isEnabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9998] pointer-events-none w-full h-full bg-transparent"
    />
  );
}
