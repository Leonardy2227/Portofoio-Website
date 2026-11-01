"use client";

import { useEffect, useRef, useState } from "react";
import "./puzzlefoto.css";

const COLS = 5;
const ROWS = 5;

export default function PuzzleFoto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlay(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`puzzle-photo ${play ? "assembled" : ""}`}
    >
      {Array.from({ length: COLS * ROWS }, (_, index) => {
        const row = Math.floor(index / COLS);
        const col = index % COLS;

        const angle = index * 137.5;
        const x = Math.cos(angle) * 180;
        const y = Math.sin(angle) * 180;

        return (
          <div
            key={index}
            className="puzzle-tile"
            style={
              {
                "--x": `${x}px`,
                "--y": `${y}px`,
                "--delay": `${index * 0.04}s`,
                "--col": col,
                "--row": row,
              } as React.CSSProperties
            }
          />
        );
      })}
    </div>
  );
}