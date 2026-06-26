"use client";

import { useEffect, useRef, useState } from "react";

interface TrailPoint {
  x: number;
  y: number;
  alpha: number;
  life: number; // 1.0 down to 0
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  alpha: number;
}

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isEnabled, setIsEnabled] = useState(false);

  // Core coordinates
  const mousePos = useRef({ x: 0, y: 0 }); // Raw mouse coordinates
  const cursorPos = useRef({ x: 0, y: 0 }); // Damped spring coordinates
  const velocity = useRef({ x: 0, y: 0 }); // Current velocity vector
  
  // Custom states
  const cursorMode = useRef<string>("default");
  const attractPoint = useRef<{ x: number; y: number } | null>(null);
  const trail = useRef<TrailPoint[]>([]);
  const ripples = useRef<Ripple[]>([]);
  const isTabActive = useRef(true);

  // 1. Separate listener for user settings and platform status
  useEffect(() => {
    const checkEnabled = () => {
      const hasReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isTouch = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
      const isSmallScreen = window.innerWidth < 768;
      const disabledByUser = localStorage.getItem("custom-cursor-disabled") === "true";

      if (hasReducedMotion || isTouch || isSmallScreen || disabledByUser) {
        setIsEnabled(false);
        document.documentElement.classList.remove("custom-cursor-active");
      } else {
        setIsEnabled(true);
        document.documentElement.classList.add("custom-cursor-active");
      }
    };

    checkEnabled();
    window.addEventListener("cursor-toggle", checkEnabled);
    window.addEventListener("resize", checkEnabled);

    return () => {
      window.removeEventListener("cursor-toggle", checkEnabled);
      window.removeEventListener("resize", checkEnabled);
      document.documentElement.classList.remove("custom-cursor-active");
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

    // Event Delegation: Listen at root body level
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Find hovered items
      const target = e.target as HTMLElement;
      const hoverElement = target.closest("[data-cursor]");
      
      if (hoverElement) {
        const mode = hoverElement.getAttribute("data-cursor") || "default";
        cursorMode.current = mode;

        // Apply subtle attraction force towards button centers
        if (mode === "button") {
          const rect = hoverElement.getBoundingClientRect();
          attractPoint.current = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          };
        } else {
          attractPoint.current = null;
        }
      } else {
        cursorMode.current = "default";
        attractPoint.current = null;
      }
    };

    const handleMouseDown = () => {
      // Trigger click ripple
      ripples.current.push({
        x: cursorPos.current.x,
        y: cursorPos.current.y,
        radius: 1,
        alpha: 0.8,
      });
    };

    const handleMouseLeaveWindow = () => {
      cursorMode.current = "hidden";
    };

    const handleMouseEnterWindow = () => {
      cursorMode.current = "default";
    };

    // Tracking active tab state
    const handleVisibilityChange = () => {
      isTabActive.current = !document.hidden;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Dynamic Trail Generator
    let lastTrailEmitTime = 0;
    const emitTrailPoint = (x: number, y: number) => {
      const now = performance.now();
      if (now - lastTrailEmitTime > 30) { // Emit every 30ms on movement
        trail.current.push({ x, y, alpha: 0.8, life: 1.0 });
        lastTrailEmitTime = now;
      }
    };

    // Main 60 FPS animation loop using spring interpolation
    const renderLoop = () => {
      if (!isTabActive.current) {
        animFrameId = requestAnimationFrame(renderLoop);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Determine spring target coord (magnetic attraction vs raw cursor)
      let targetX = mousePos.current.x;
      let targetY = mousePos.current.y;

      if (attractPoint.current) {
        // Attract 18% of the way to the button center (subtle, non-locking attraction)
        targetX = mousePos.current.x + (attractPoint.current.x - mousePos.current.x) * 0.18;
        targetY = mousePos.current.y + (attractPoint.current.y - mousePos.current.y) * 0.18;
      }

      // Spring calculation
      const k = 0.28; // stiffness coefficient
      const damping = 0.58; // damping coefficient
      
      const ax = (targetX - cursorPos.current.x) * k;
      const ay = (targetY - cursorPos.current.y) * k;

      velocity.current.x = velocity.current.x * damping + ax;
      velocity.current.y = velocity.current.y * damping + ay;

      const lastX = cursorPos.current.x;
      const lastY = cursorPos.current.y;

      cursorPos.current.x += velocity.current.x;
      cursorPos.current.y += velocity.current.y;

      // Emit trail particle if moving
      const dx = cursorPos.current.x - lastX;
      const dy = cursorPos.current.y - lastY;
      const speed = Math.sqrt(dx * dx + dy * dy);
      if (speed > 1.5 && cursorMode.current !== "hidden") {
        emitTrailPoint(cursorPos.current.x, cursorPos.current.y);
      }

      // 1. Draw Trails (phase-space points)
      // Filter out dead particles; limit max active points to 7 to match "restraint" rule
      trail.current = trail.current.filter((p) => p.life > 0);
      if (trail.current.length > 7) {
        trail.current.shift();
      }

      trail.current.forEach((p) => {
        ctx.beginPath();
        // Faint scientific blue color
        ctx.fillStyle = `rgba(15, 76, 129, ${p.alpha * 0.45})`; // light mode blue
        if (document.documentElement.classList.contains("dark")) {
          ctx.fillStyle = `rgba(56, 189, 248, ${p.alpha * 0.5})`; // dark mode blue
        }
        ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
        ctx.fill();

        // Age particle: fades out in ~300ms
        p.life -= 0.04;
        p.alpha -= 0.04;
      });

      // 2. Draw Ripples
      ripples.current = ripples.current.filter((r) => r.alpha > 0);
      ripples.current.forEach((r) => {
        ctx.beginPath();
        ctx.strokeStyle = document.documentElement.classList.contains("dark")
          ? `rgba(56, 189, 248, ${r.alpha})`
          : `rgba(15, 76, 129, ${r.alpha})`;
        ctx.lineWidth = 0.75;
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.stroke();

        r.radius += 1.8;
        r.alpha -= 0.04;
      });

      // 3. Draw Core Cursor
      if (cursorMode.current !== "hidden") {
        const dark = document.documentElement.classList.contains("dark");
        const sciBlue = dark ? "#38bdf8" : "#0f4c81";
        const ringColor = dark ? "rgba(236, 236, 237, 0.25)" : "rgba(26, 26, 26, 0.2)";

        const mode = cursorMode.current;
        const cx = cursorPos.current.x;
        const cy = cursorPos.current.y;

        ctx.save();

        if (mode === "text") {
          // Paragraph text hover state
          ctx.globalAlpha = 0.65;
          
          // Inner dot slightly larger (4.5px)
          ctx.beginPath();
          ctx.fillStyle = sciBlue;
          ctx.arc(cx, cy, 4, 0, Math.PI * 2);
          ctx.fill();

          // Outer ring is thinner
          ctx.beginPath();
          ctx.strokeStyle = ringColor;
          ctx.lineWidth = 0.5;
          ctx.arc(cx, cy, 14, 0, Math.PI * 2);
          ctx.stroke();

        } else if (mode === "button") {
          // Button / interactive link hover state
          ctx.beginPath();
          ctx.fillStyle = sciBlue;
          ctx.arc(cx, cy, 5.5, 0, Math.PI * 2);
          ctx.fill();

          // Outer ring brightens and scales slightly
          ctx.beginPath();
          ctx.strokeStyle = dark ? "rgba(56, 189, 248, 0.5)" : "rgba(15, 76, 129, 0.4)";
          ctx.lineWidth = 1;
          ctx.arc(cx, cy, 15, 0, Math.PI * 2);
          ctx.stroke();

        } else if (["explore", "think", "read", "connect", "journey", "researcher"].includes(mode)) {
          // Pill / Capsule shape state
          const textMap: Record<string, string> = {
            explore: "→ Explore",
            think: "Think",
            read: "Read",
            connect: "Connect",
            journey: "Journey",
            researcher: "Researcher"
          };

          const label = textMap[mode] || "";
          
          ctx.font = "9px var(--font-sans), Inter, sans-serif";
          ctx.textBaseline = "middle";
          const textWidth = ctx.measureText(label).width;
          
          const paddingX = 9;
          const paddingY = 5.5;
          const w = textWidth + paddingX * 2;
          const h = 18;

          // Capsule box positioning (centered on cursor)
          const rx = cx - w / 2;
          const ry = cy - h / 2;

          // Draw backdrop capsule box
          ctx.beginPath();
          ctx.fillStyle = dark ? "rgba(17, 17, 19, 0.95)" : "rgba(255, 255, 255, 0.95)";
          ctx.strokeStyle = dark ? "rgba(236, 236, 237, 0.15)" : "rgba(26, 26, 26, 0.1)";
          ctx.lineWidth = 0.85;
          
          // Custom roundRect draw for older browsers, standard is roundRect
          if (ctx.roundRect) {
            ctx.roundRect(rx, ry, w, h, 9);
          } else {
            ctx.rect(rx, ry, w, h);
          }
          ctx.fill();
          ctx.stroke();

          // Draw label text
          ctx.fillStyle = dark ? "#ececed" : "#1a1a1a";
          ctx.textAlign = "center";
          ctx.fillText(label, cx, cy + 0.5);

        } else if (["nabla", "func", "partial"].includes(mode)) {
          // Mathematical equations hover state (nabla, f, partial derivative)
          const glyphMap: Record<string, string> = {
            nabla: "∇",
            func: "ƒ",
            partial: "∂"
          };
          const glyph = glyphMap[mode];

          // Inner dot remains small
          ctx.beginPath();
          ctx.fillStyle = sciBlue;
          ctx.arc(cx, cy, 3, 0, Math.PI * 2);
          ctx.fill();

          // Outer ring replaced with glyph (faded in)
          ctx.fillStyle = dark ? "rgba(56, 189, 248, 0.75)" : "rgba(15, 76, 129, 0.7)";
          ctx.font = "14px serif, var(--font-serif)";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(glyph, cx, cy - 0.5);

        } else {
          // Default State
          ctx.beginPath();
          ctx.fillStyle = sciBlue;
          ctx.arc(cx, cy, 3.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.beginPath();
          ctx.strokeStyle = ringColor;
          ctx.lineWidth = 0.75;
          ctx.arc(cx, cy, 12, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.restore();
      }

      animFrameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.documentElement.classList.remove("custom-cursor-active");
      cancelAnimationFrame(animFrameId);
    };
  }, [isEnabled]);

  if (!isEnabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9999] pointer-events-none w-full h-full"
    />
  );
}
