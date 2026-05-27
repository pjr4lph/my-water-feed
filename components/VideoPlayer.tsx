"use client";
import { useEffect, useRef } from "react";

interface VideoProps {
  src: string;
  poster: string;
  isActive: boolean; // Is currently being watched
  isNearby: boolean; // Is the next or previous video
}

export default function VideoPlayer({ src, poster, isActive, isNearby }: VideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Play/Pause logic
  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive]);

  // Logic: Only "mount" the video tag if it is active or nearby.
  // This limits the browser to only 3 active video decoders at a time.
  const shouldRenderVideo = isActive || isNearby;

  return (
    <div className="relative h-[100dvh] w-full flex-shrink-0 snap-start bg-black overflow-hidden">
      {shouldRenderVideo ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          loop
          playsInline
          muted
          preload="auto"
          className="h-full w-full object-cover transition-opacity duration-500"
          style={{ opacity: isActive ? 1 : 0.5 }} // Dim nearby videos for focus
        />
      ) : (
        // Fallback to static image when far away to save RAM
        <img
          src={poster}
          alt="Video thumbnail"
          className="h-full w-full object-cover"
        />
      )}

      {/* Optional Overlay UI */}
      <div className="absolute bottom-12 left-6 text-white z-10">
        <h2 className="font-bold text-lg">@ContentCreator</h2>
        <p className="text-sm opacity-80">Check out this seamless loop! #NextJS #AWS</p>
      </div>
    </div>
  );
}