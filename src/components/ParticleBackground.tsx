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
}

interface ParticleBackgroundProps {
  sectionRef: React.RefObject<HTMLElement>;
  particleColor?: string;
  particleCount?: number;
}

export default function ParticleBackground({
  sectionRef,
  particleColor = "rgba(156, 204, 60, 0.6)",
  particleCount = 40,
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
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

    const particles: Particle[] = [];

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: Math.random() * 2 + 1,
        opacity: 0,
        targetOpacity: Math.random() * 0.6 + 0.2,
        life: 0,
        maxLife: Math.random() * 60 + 40,
      });
    }

    particlesRef.current = particles;

    const animate = () => {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.life += 1;
        if (particle.life > particle.maxLife) {
          particle.life = 0;
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
          particle.opacity = 0;
          particle.targetOpacity = Math.random() * 0.6 + 0.2;
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

        // Draw particle
        ctx.fillStyle = particleColor.replace(/[\d.]+\)$/g, `${particle.opacity})`);
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw connecting lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const lineOpacity = (1 - distance / 100) * 0.2 * Math.min(particles[i].opacity, particles[j].opacity);
            ctx.strokeStyle = particleColor.replace(/[\d.]+\)$/g, `${lineOpacity})`);
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particleColor, particleCount]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}
