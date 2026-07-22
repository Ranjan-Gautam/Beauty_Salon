"use client";

import { useEffect, useState } from "react";

export function useCountUp(
  end: number,
  ref: React.RefObject<HTMLDivElement | null>,
  duration = 1800,
  decimals = 0
) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setHasStarted(true),
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);

  useEffect(() => {
    if (!hasStarted) return;
    let start: number | null = null;
    let frameId: number;

    const animate = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(progress * end);
      if (progress < 1) frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [hasStarted, end, duration]);

  return count.toFixed(decimals);
}