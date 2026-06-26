"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  trail: { x: number; y: number }[];
}

export default function MathematicalBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    let particles: Particle[] = [];
    const maxParticles = 60;
    const trailLength = 25;

    // Detect if dark mode is active to dynamically shift background/line colors
    const isDarkMode = () => {
      return document.documentElement.classList.contains("dark");
    };

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      initParticles();
    };

    const createParticle = (): Particle => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const maxLife = 200 + Math.random() * 300;
      return {
        x,
        y,
        vx: 0,
        vy: 0,
        life: 0,
        maxLife,
        trail: [],
      };
    };

    const initParticles = () => {
      particles = Array.from({ length: maxParticles }, createParticle);
    };

    // Slow, elegant vector field equations representing dynamical systems/phase portrait flow
    const getVectorForce = (x: number, y: number, t: number) => {
      // Scale down coordinates to feed into trigonometric functions
      const sx = x * 0.0035;
      const sy = y * 0.0035;

      // Hamiltonian-like flow fields with a time-varying perturbation
      const dx = Math.sin(sy + t * 0.015) + Math.cos(sx * 0.8 - t * 0.01);
      const dy = Math.cos(sx - t * 0.015) - Math.sin(sy * 0.8 + t * 0.02);

      return { dx: dx * 0.22, dy: dy * 0.22 };
    };

    const updateParticles = () => {
      particles.forEach((p) => {
        // Record trail history
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > trailLength) {
          p.trail.shift();
        }

        // Apply force from vector field
        const force = getVectorForce(p.x, p.y, time);
        
        // Newtonian physics integration
        p.vx = p.vx * 0.95 + force.dx * 0.05;
        p.vy = p.vy * 0.95 + force.dy * 0.05;
        
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        // Edge detection & lifespan resetting
        const isOffscreen =
          p.x < -20 ||
          p.x > window.innerWidth + 20 ||
          p.y < -20 ||
          p.y > window.innerHeight + 20;

        if (p.life >= p.maxLife || isOffscreen) {
          Object.assign(p, createParticle());
        }
      });
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Determine drawing colors based on theme
      const dark = isDarkMode();
      // Extremely low opacity to stay elegant and non-flashy (~3% light, ~6% dark)
      const lineColor = dark ? "rgba(56, 189, 248, 0.04)" : "rgba(15, 76, 129, 0.035)";
      const headColor = dark ? "rgba(236, 236, 237, 0.08)" : "rgba(26, 26, 26, 0.06)";

      ctx.lineWidth = 0.85;
      ctx.lineCap = "round";

      particles.forEach((p) => {
        if (p.trail.length < 2) return;

        // Draw particle trail (line string)
        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.moveTo(p.trail[0].x, p.trail[0].y);
        for (let i = 1; i < p.trail.length; i++) {
          ctx.lineTo(p.trail[i].x, p.trail[i].y);
        }
        ctx.stroke();

        // Draw active head
        ctx.beginPath();
        ctx.fillStyle = headColor;
        ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const tick = () => {
      // Don't waste GPU cycles if the tab is hidden
      if (!document.hidden) {
        time += 0.5;
        updateParticles();
        drawParticles();
      }
      animationFrameId = requestAnimationFrame(tick);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    tick();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 h-full w-full pointer-events-none bg-background transition-colors duration-300"
    />
  );
}
