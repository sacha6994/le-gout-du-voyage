"use client";

import { motion, useScroll, useTransform } from "framer-motion";

const PATH_D =
  "M 50,-2 C 82,5 18,10 30,14 S 88,20 62,26 C 18,31 78,37 42,42 S 12,50 58,55 C 88,59 22,66 62,71 S 92,80 50,87 C 28,92 68,97 50,102";

const WAYPOINTS = [
  { x: 50, y: 0 },
  { x: 30, y: 14 },
  { x: 62, y: 26 },
  { x: 42, y: 42 },
  { x: 58, y: 55 },
  { x: 62, y: 71 },
  { x: 50, y: 87 },
  { x: 50, y: 100 },
];

export default function GoldenThread() {
  const { scrollYProgress } = useScroll();
  const pathLength = useTransform(scrollYProgress, [0, 0.95], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.9, 1], [0, 1, 1, 0.3]);

  return (
    <div className="absolute inset-0 pointer-events-none z-[5] overflow-hidden">
      <svg
        className="absolute top-0 left-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="goldThread" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C9A96E" stopOpacity="0.05" />
            <stop offset="15%" stopColor="#C9A96E" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#C9A96E" stopOpacity="0.35" />
            <stop offset="85%" stopColor="#C9A96E" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#C9A96E" stopOpacity="0.05" />
          </linearGradient>
          <filter id="threadGlow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>
        </defs>

        {/* Faint background trace */}
        <path
          d={PATH_D}
          stroke="#C9A96E"
          strokeWidth="1"
          strokeOpacity="0.04"
          vectorEffect="non-scaling-stroke"
        />

        {/* Glow layer */}
        <motion.path
          d={PATH_D}
          stroke="#C9A96E"
          strokeWidth="6"
          strokeOpacity="0.06"
          vectorEffect="non-scaling-stroke"
          filter="url(#threadGlow)"
          style={{ pathLength, opacity }}
        />

        {/* Main golden thread */}
        <motion.path
          d={PATH_D}
          stroke="url(#goldThread)"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          style={{ pathLength, opacity }}
        />

        {/* Waypoint diamonds */}
        {WAYPOINTS.slice(1, -1).map((wp, i) => (
          <g key={i} transform={`translate(${wp.x}, ${wp.y})`}>
            <motion.rect
              x="-0.4"
              y="-0.4"
              width="0.8"
              height="0.8"
              fill="#C9A96E"
              transform="rotate(45)"
              style={{
                opacity: useTransform(
                  scrollYProgress,
                  [Math.max(0, wp.y / 100 - 0.05), wp.y / 100],
                  [0, 0.4]
                ),
              }}
              vectorEffect="non-scaling-stroke"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
