// src/components/CursorGlow.jsx
import { useState, useEffect, useRef } from "react";

export default function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const trail = useRef([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);

  const [pulse, setPulse] = useState(0);

  // Track mouse
  useEffect(() => {
    const updatePos = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", updatePos);

    // Track hover on feature cards
    const cards = document.querySelectorAll(".feature-card");
    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => setHovering(true));
      card.addEventListener("mouseleave", () => setHovering(false));
    });

    return () => {
      window.removeEventListener("mousemove", updatePos);
      cards.forEach((card) => {
        card.removeEventListener("mouseenter", () => setHovering(true));
        card.removeEventListener("mouseleave", () => setHovering(false));
      });
    };
  }, []);

  // Animate smooth trailing
  useEffect(() => {
    let animationFrame;
    const animate = () => {
      // Increased factor to 0.35 for faster trailing
      trail.current = trail.current.map((t, i) => ({
        x: t.x + (i === 0 ? (pos.x - t.x) * 0.35 : (trail.current[i - 1].x - t.x) * 0.35),
        y: t.y + (i === 0 ? (pos.y - t.y) * 0.35 : (trail.current[i - 1].y - t.y) * 0.35),
      }));

      setPulse((prev) => (prev >= 10 ? 0 : prev + 0.15));
      animationFrame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [pos]);

  const baseSize = 200;
  const sizePulse = 15 * Math.sin(pulse);
  const intensity = hovering ? 0.35 : 0.25;
  const intensity2 = hovering ? 0.25 : 0.18;
  const intensity3 = hovering ? 0.2 : 0.12;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 mix-blend-screen"
      style={{
        background: `
          radial-gradient(${baseSize + sizePulse}px circle at ${trail.current[0].x}px ${trail.current[0].y}px, rgba(56,189,248,${intensity}), transparent 80%),
          radial-gradient(${(baseSize * 0.7) + sizePulse * 0.7}px circle at ${trail.current[1].x}px ${trail.current[1].y}px, rgba(14,165,233,${intensity2}), transparent 80%),
          radial-gradient(${(baseSize * 0.5) + sizePulse * 0.5}px circle at ${trail.current[2].x}px ${trail.current[2].y}px, rgba(3,105,161,${intensity3}), transparent 80%)
        `,
        transition: "background 0.02s",
      }}
    />
  );
}
