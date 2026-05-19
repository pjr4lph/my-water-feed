"use client";
import { useEffect, useRef, useState } from "react";

interface VideoProps {
  src: string;
  poster: string;
  isActive: boolean;
}

export default function VideoPlayer({ src, poster, isActive }: VideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play().catch((e) => console.log("Autoplay blocked", e));
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0; // Restart video when scrolling back
      }
    }
  }, [isActive]);

  return (
    <div className="relative h-[100dvh] w-full flex-shrink-0 snap-start bg-black">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        loop
        playsInline
        muted // Required for mobile autoplay
        className="h-full w-full object-cover"
      />
      {/* UI Overlay (Optional) */}
      <div className="absolute bottom-10 left-5 text-white">
        <p className="font-bold">@YourBrand</p>
        <p className="text-sm">Continuous video feed description...</p>
      </div>
    </div>
  );
}