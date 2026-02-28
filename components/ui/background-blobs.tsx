"use client";

import { motion } from "framer-motion";

const blobs = [
  {
    id: "blob-a",
    className:
      "left-[-10%] top-[5%] h-[360px] w-[360px] bg-[radial-gradient(circle,_rgba(168,85,247,0.28)_0%,_rgba(168,85,247,0)_68%)]",
    duration: 18,
    x: [0, 50, -20, 0],
    y: [0, -30, 20, 0],
    scale: [1, 1.15, 0.95, 1],
  },
  {
    id: "blob-b",
    className:
      "right-[-8%] top-[30%] h-[420px] w-[420px] bg-[radial-gradient(circle,_rgba(34,211,238,0.2)_0%,_rgba(34,211,238,0)_72%)]",
    duration: 22,
    x: [0, -45, 30, 0],
    y: [0, 25, -22, 0],
    scale: [1, 0.92, 1.12, 1],
  },
  {
    id: "blob-c",
    className:
      "bottom-[-8%] left-[30%] h-[300px] w-[300px] bg-[radial-gradient(circle,_rgba(255,77,109,0.22)_0%,_rgba(255,77,109,0)_74%)]",
    duration: 16,
    x: [0, 28, -18, 0],
    y: [0, -26, 20, 0],
    scale: [1, 1.1, 0.9, 1],
  },
];

export default function BackgroundBlobs() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        aria-hidden
        className="gradient-motion absolute inset-0 opacity-80"
        animate={{ opacity: [0.55, 0.9, 0.55] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      {blobs.map((blob) => (
        <motion.div
          key={blob.id}
          aria-hidden
          className={`absolute rounded-full blur-3xl ${blob.className}`}
          animate={{
            x: blob.x,
            y: blob.y,
            scale: blob.scale,
          }}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
