import React, { useEffect, useRef, useMemo } from "react";
import { useTheme } from "../context/ThemeContext";
import "./Galaxy.css";

/**
 * Canvas-based galaxy/starfield background.
 * - Fixed, full-viewport canvas rendered behind content
 * - Theme-aware (light/dark)
 * - Optional mouse interaction and twinkling
 */
export default function Galaxy({
  density = 1.5,
  twinkleIntensity = 0.4,
  rotationSpeed = 0.03,
  mouseInteraction = true,
  mouseRepulsion = true,
  repulsionStrength = 3,
  hueShift = 240,
  saturation = 0.8,
  glowIntensity = 0.5,
  transparent = true,
  style = {},
  adaptivePerformance = true,
}) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const parallaxRef = useRef({ x: 0, y: 0 });
  const lastTimeRef = useRef(0);
  const timeSecRef = useRef(0);
  const shootingStarsRef = useRef([]);
  const nextShootingAtRef = useRef(0);
  const rotationPhaseRef = useRef(0);
  const qualityRef = useRef({ glowScale: 1, skipStep: 1 });
  const fpsSamplesRef = useRef([]);
  const reducedMotionRef = useRef(false);
  const { isDark } = useTheme();

  const config = useMemo(() => {
    const baseBg = isDark ? "#030712" : "#f7fafc";
    const starColor = isDark ? "rgba(63, 3, 122, 0.9)" : "rgba(217, 218, 221, 0.9)";
    const starColorSecondary = isDark ? "rgb(255, 255, 255)" : "rgba(197, 197, 201, 0.9)";
    return { baseBg, starColor, starColorSecondary };
  }, [isDark]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: transparent });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * devicePixelRatio);
      canvas.height = Math.floor(height * devicePixelRatio);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      // Fill base background if not transparent
      if (!transparent) {
        ctx.fillStyle = config.baseBg;
        ctx.fillRect(0, 0, width, height);
      }
    };

    // Reduced motion preference
    const media = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionRef.current = !!(media && media.matches);
    const onMediaChange = (e) => { reducedMotionRef.current = !!e.matches; };
    if (media && media.addEventListener) media.addEventListener('change', onMediaChange);
    resize();
    window.addEventListener("resize", resize);

    const area = width * height;
    const baseCount = Math.floor(area * 0.00045 * density);
    const starCount = Math.max(600, Math.min(3000, baseCount));

    const rand = (min, max) => Math.random() * (max - min) + min;

    // Create soft clusters for visual interest
    const numClusters = Math.max(2, Math.floor(4 * density));
    const clusters = new Array(numClusters).fill(0).map(() => ({
      x: rand(width * 0.15, width * 0.85),
      y: rand(height * 0.15, height * 0.85),
      radius: rand(Math.min(width, height) * 0.06, Math.min(width, height) * 0.16),
      strength: rand(0.4, 1),
    }));

    // Multi-layer parallax: background, mid, foreground
    const layers = [
      { factor: 0.25, sizeScale: 0.7, glowScale: 0.6 },
      { factor: 0.5, sizeScale: 1.0, glowScale: 1.0 },
      { factor: 1.0, sizeScale: 1.4, glowScale: 1.3 },
    ];

    const makeStar = (layer) => {
      // 35% chance to bias star near a cluster
      let x, y;
      if (Math.random() < 0.35) {
        const c = clusters[Math.floor(Math.random() * clusters.length)];
        const ang = Math.random() * Math.PI * 2;
        const distC = Math.pow(Math.random(), 1.8) * c.radius; // bias closer to center
        x = c.x + Math.cos(ang) * distC + rand(-20, 20);
        y = c.y + Math.sin(ang) * distC + rand(-20, 20);
      } else {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * Math.max(width, height) * 0.65;
        x = width / 2 + Math.cos(angle) * dist + rand(-width * 0.12, width * 0.12);
        y = height / 2 + Math.sin(angle) * dist + rand(-height * 0.12, height * 0.12);
      }
      const radius = Math.pow(Math.random(), 2) * 1.6 * layer.sizeScale + 0.2;
      const baseAlpha = rand(0.35, 1);
      const twinklePhase = Math.random() * Math.PI * 2;
      const twinklePeriod = rand(1.5, 3.0); // seconds
      const useAlt = Math.random() > 0.6;
      return { x, y, r: radius, a: baseAlpha, p: twinklePhase, tw: twinklePeriod, useAlt, layer };
    };

    const layerCounts = [
      Math.floor(starCount * 0.35),
      Math.floor(starCount * 0.4),
      starCount - Math.floor(starCount * 0.35) - Math.floor(starCount * 0.4),
    ];
    const stars = [];
    for (let li = 0; li < layers.length; li++) {
      for (let i = 0; i < layerCounts[li]; i++) stars.push(makeStar(layers[li]));
    }

    const draw = (now = 0) => {
      const dt = lastTimeRef.current ? (now - lastTimeRef.current) / 1000 : 0;
      lastTimeRef.current = now;
      timeSecRef.current += dt;
      // rotation over time for subtle motion
      const rotationSpeedScaled = reducedMotionRef.current ? rotationSpeed * 0.4 : rotationSpeed;
      rotationPhaseRef.current += rotationSpeedScaled * dt;

      // gather fps samples and adapt quality every ~2s
      if (adaptivePerformance && dt > 0) {
        const fps = Math.min(120, 1 / dt);
        fpsSamplesRef.current.push(fps);
        if (fpsSamplesRef.current.length >= 120) {
          const avg = fpsSamplesRef.current.reduce((a, b) => a + b, 0) / fpsSamplesRef.current.length;
          // Adjust render quality gently
          if (avg < 50) {
            qualityRef.current.skipStep = Math.min(3, qualityRef.current.skipStep + 1);
            qualityRef.current.glowScale = Math.max(0.6, qualityRef.current.glowScale * 0.9);
          } else if (avg > 58) {
            qualityRef.current.skipStep = Math.max(1, qualityRef.current.skipStep - 1);
            qualityRef.current.glowScale = Math.min(1, qualityRef.current.glowScale * 1.05);
          }
          fpsSamplesRef.current = [];
        }
      }

      // clear with fade for smoother trails
      ctx.globalCompositeOperation = "source-over";
      if (transparent) {
        ctx.clearRect(0, 0, width, height);
      } else {
        ctx.fillStyle = isDark ? "rgba(3, 7, 18, 0.8)" : "rgba(247, 250, 252, 0.8)";
        ctx.fillRect(0, 0, width, height);
      }

      // Subtle radial gradient tint for depth
      const grad = ctx.createRadialGradient(width * 0.5, height * 0.45, 0, width * 0.5, height * 0.55, Math.max(width, height) * 0.7);
      if (isDark) {
        grad.addColorStop(0, "rgba(9, 16, 32, 0.65)");
        grad.addColorStop(1, "rgba(3, 7, 18, 0)");
      } else {
        grad.addColorStop(0, "rgba(226, 232, 240, 0.35)");
        grad.addColorStop(1, "rgba(255, 255, 255, 0)");
      }
      ctx.globalAlpha = 1;
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      // Smooth parallax follow towards mouse
      // slow base drift loop between 10–30s per axis
      const loopX = 10 + (width % 20); // pseudo-random but stable per viewport
      const loopY = 20 + (height % 10);
      const baseDriftX = Math.sin((2 * Math.PI * timeSecRef.current) / loopX) * 6;
      const baseDriftY = Math.cos((2 * Math.PI * timeSecRef.current) / loopY) * 6;
      const targetParallaxX = ((mx || width / 2) - width / 2) * 0.02 + baseDriftX;
      const targetParallaxY = ((my || height / 2) - height / 2) * 0.02 + baseDriftY;
      parallaxRef.current.x += (targetParallaxX - parallaxRef.current.x) * Math.min(10 * dt, 1);
      parallaxRef.current.y += (targetParallaxY - parallaxRef.current.y) * Math.min(10 * dt, 1);

      const skipStep = adaptivePerformance ? qualityRef.current.skipStep : 1;
      for (let i = 0; i < stars.length; i++) {
        if (skipStep > 1 && (i % skipStep !== 0)) continue;
        const s = stars[i];

        // gentle rotation around center
        const dx = s.x - width / 2;
        const dy = s.y - height / 2;
        const cos = Math.cos(rotationPhaseRef.current * 0.1);
        const sin = Math.sin(rotationPhaseRef.current * 0.1);
        const rx = dx * cos - dy * sin;
        const ry = dx * sin + dy * cos;
        // parallax offset per layer
        const px = width / 2 + rx + parallaxRef.current.x * s.layer.factor;
        const py = height / 2 + ry + parallaxRef.current.y * s.layer.factor;

        // mouse repulsion
        let finalX = px;
        let finalY = py;
        if (mouseInteraction && mouseRepulsion && (mx || my)) {
          const mdx = px - mx;
          const mdy = py - my;
          const distSq = mdx * mdx + mdy * mdy + 0.0001;
          const force = Math.min(12000 / distSq, 2.5) * repulsionStrength;
          finalX += mdx * force * 0.01;
          finalY += mdy * force * 0.01;
        }

        // twinkle
        // twinkle sinusoid with per-star period (1.5–3s)
        const ang = (2 * Math.PI * timeSecRef.current) / s.tw + s.p;
        const twkIntensity = reducedMotionRef.current ? Math.min(0.15, twinkleIntensity) : twinkleIntensity;
        const twinkle = (Math.sin(ang) + 1) * 0.5 * twkIntensity;
        const alpha = Math.min(1, Math.max(0.1, s.a * (0.6 + twinkle)));

        // color
        const color = s.useAlt ? config.starColorSecondary : config.starColor;

        // glow
        const glowScale = (adaptivePerformance ? qualityRef.current.glowScale : 1) * (reducedMotionRef.current ? 0.7 : 1);
        ctx.shadowBlur = s.r * 6 * glowIntensity * s.layer.glowScale * glowScale;
        ctx.shadowColor = color;

        // draw
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.globalAlpha = alpha;
        ctx.arc(finalX, finalY, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Shooting stars
      // Spawn every ~8–15s
      const allowShooting = !reducedMotionRef.current;
      if (allowShooting && timeSecRef.current >= nextShootingAtRef.current) {
        nextShootingAtRef.current = timeSecRef.current + rand(8, 15);
        const side = Math.random() < 0.5 ? "left" : "top";
        const startX = side === "left" ? -50 : rand(0, width);
        const startY = side === "left" ? rand(0, height * 0.5) : -50;
        const speed = rand(700, 1000); // px/s
        const angle = side === "left" ? rand(Math.PI * 0.05, Math.PI * 0.25) : rand(Math.PI * 0.2, Math.PI * 0.4);
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        shootingStarsRef.current.push({ x: startX, y: startY, vx, vy, life: rand(0.9, 1.2) });
      }

      // Update & draw shooting stars
      ctx.globalCompositeOperation = "lighter";
      for (let i = shootingStarsRef.current.length - 1; i >= 0; i--) {
        const s = shootingStarsRef.current[i];
        s.life -= dt;
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        if (s.life <= 0 || s.x > width + 100 || s.y > height + 100) {
          shootingStarsRef.current.splice(i, 1);
          continue;
        }
        const trailLen = 120;
        const tailX = s.x - (s.vx / Math.hypot(s.vx, s.vy)) * trailLen;
        const tailY = s.y - (s.vy / Math.hypot(s.vx, s.vy)) * trailLen;
        const gradLine = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
        gradLine.addColorStop(0, isDark ? "rgba(255,255,255,0.9)" : "rgba(30,64,175,0.9)");
        gradLine.addColorStop(1, "rgba(255,255,255,0)");
        ctx.strokeStyle = gradLine;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
      }
      ctx.globalCompositeOperation = "source-over";

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(draw);
    };

    const handleMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    if (mouseInteraction) window.addEventListener("mousemove", handleMouse);

    draw();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      if (mouseInteraction) window.removeEventListener("mousemove", handleMouse);
      if (media && media.removeEventListener) media.removeEventListener('change', onMediaChange);
    };
  }, [density, twinkleIntensity, rotationSpeed, mouseInteraction, mouseRepulsion, repulsionStrength, hueShift, saturation, glowIntensity, transparent, adaptivePerformance, config.baseBg, config.starColor, config.starColorSecondary, isDark]);

  return (
    <div className="galaxy-container" style={style} aria-hidden="true">
      <canvas ref={canvasRef} className="galaxy-canvas" />
    </div>
  );
}
