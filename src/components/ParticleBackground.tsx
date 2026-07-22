"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValue } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  targetOpacity: number;
  life: number;
  maxLife: number;
  /** Smoothed offset toward the cursor, so the swarm eases in and out. */
  ox: number;
  oy: number;
}

// Brand green (tailwind.config.ts): #9CCC3C.
const BRAND_GREEN = "156, 204, 60";

interface ParticleBackgroundProps {
  sectionRef: React.RefObject<HTMLElement>;
  /** "r, g, b" triple the particles are drawn in. */
  particleColor?: string;
  particleCount?: number;
}

export default function ParticleBackground({
  sectionRef,
  particleColor = BRAND_GREEN,
  particleCount = 70,
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  // Cursor position in canvas space; active=false when the pointer is away.
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const { scrollY } = useScroll();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // The canvas is pointer-events-none, so track the pointer on the window and
    // translate into canvas space. Anything outside the canvas counts as away.
    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseRef.current = {
        x,
        y,
        active: x >= 0 && y >= 0 && x <= rect.width && y <= rect.height,
      };
    };
    const handlePointerLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("blur", handlePointerLeave);

    const particles: Particle[] = [];

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: Math.random() * 2.4 + 1.6,
        opacity: 0,
        targetOpacity: Math.random() * 0.45 + 0.55,
        life: 0,
        maxLife: Math.random() * 60 + 40,
        ox: 0,
        oy: 0,
      });
    }

    particlesRef.current = particles;

    // Cursor influence: how far it reaches, how far it can drag a particle, and
    // how fast the swarm eases toward/away from the cursor.
    const HOVER_RADIUS = 280;
    const MAX_PULL = 220;
    const EASE = 0.075;
    // Particles stop short of the cursor so the swarm reads as a cluster
    // rather than collapsing into one dot.
    const CORE_GAP = 26;

    const animate = () => {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;
      // Rendered positions for this frame (cursor displacement included) so the
      // link web follows the particles you can actually see.
      const points: { x: number; y: number; r: number; o: number }[] = [];

      particles.forEach((particle) => {
        particle.life += 1;
        if (particle.life > particle.maxLife) {
          particle.life = 0;
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
          particle.opacity = 0;
          particle.targetOpacity = Math.random() * 0.45 + 0.55;
          // Respawn is a teleport - drop any inherited cursor pull with it.
          particle.ox = 0;
          particle.oy = 0;
        }

        // Fade in and out
        if (particle.life < 10) {
          particle.opacity = (particle.life / 10) * particle.targetOpacity;
        } else if (particle.life > particle.maxLife - 10) {
          particle.opacity =
            ((particle.maxLife - particle.life) / 10) * particle.targetOpacity;
        } else {
          particle.opacity = particle.targetOpacity;
        }

        // Move particle
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x - particle.radius < 0 || particle.x + particle.radius > canvas.width) {
          particle.vx *= -1;
          particle.x = Math.max(particle.radius, Math.min(canvas.width - particle.radius, particle.x));
        }
        if (particle.y - particle.radius < 0 || particle.y + particle.radius > canvas.height) {
          particle.vy *= -1;
          particle.y = Math.max(particle.radius, Math.min(canvas.height - particle.radius, particle.y));
        }

        // Cursor interaction: particles in range are drawn toward the pointer
        // and gather around it. The pull is a smoothed render-time offset, so
        // the underlying drift physics stay untouched and the swarm drifts back
        // home once the cursor leaves.
        let targetOx = 0;
        let targetOy = 0;

        if (mouse.active) {
          const mdx = mouse.x - particle.x;
          const mdy = mouse.y - particle.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mdist < HOVER_RADIUS && mdist > 0.001) {
            // Closer particles commit harder to the cursor.
            const strength = 1 - mdist / HOVER_RADIUS;
            const travel = Math.min(strength * MAX_PULL, Math.max(0, mdist - CORE_GAP));
            targetOx = (mdx / mdist) * travel;
            targetOy = (mdy / mdist) * travel;
          }
        }

        particle.ox += (targetOx - particle.ox) * EASE;
        particle.oy += (targetOy - particle.oy) * EASE;

        const px = particle.x + particle.ox;
        const py = particle.y + particle.oy;

        // Gathered particles burn brighter and bigger.
        const gather = Math.min(1, Math.hypot(particle.ox, particle.oy) / MAX_PULL);
        const pr = particle.radius + gather * 2.2;
        const po = Math.min(1, particle.opacity + gather * 0.5);

        points.push({ x: px, y: py, r: pr, o: po });

        // Draw particle with a soft glow so it reads against the dark band
        ctx.fillStyle = `rgba(${particleColor}, ${po})`;
        ctx.shadowBlur = pr * 4;
        ctx.shadowColor = `rgba(${particleColor}, ${po * 0.8})`;
        ctx.beginPath();
        ctx.arc(px, py, pr, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw connecting lines between nearby particles
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const lineOpacity = (1 - distance / 150) * 0.5 * Math.min(points[i].o, points[j].o);
            ctx.strokeStyle = `rgba(${particleColor}, ${lineOpacity})`;
            ctx.lineWidth = 0.9;
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.stroke();
          }
        }
      }

      // Web the cursor into the field it is disturbing
      if (mouse.active) {
        for (const p of points) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < HOVER_RADIUS) {
            const lineOpacity = (1 - distance / HOVER_RADIUS) * 0.4 * p.o;
            ctx.strokeStyle = `rgba(${particleColor}, ${lineOpacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("blur", handlePointerLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particleColor, particleCount]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full pointer-events-none"
      style={{ opacity: 1 }}
    />
  );
}
