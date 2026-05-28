"use client";
import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface VideoProps {
  src: string;
  poster: string;
  isActive: boolean; // Is currently being watched
  isNearby: boolean; // Is the next or previous video
  isMuted: boolean;
  toggleMute: () => void;
}

export default function VideoPlayer({ src, poster, isActive, isNearby, isMuted, toggleMute }: VideoProps) {
  const [showIcon, setShowIcon] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Play/Pause logic
  useEffect(() => {
    if (videoRef.current) {
      // Sync the internal muted state with the global prop
      videoRef.current.muted = isMuted;

      if (isActive) {
        videoRef.current.play().catch(() => {
          // Fallback: If autoplay fails because of audio, force mute it
          if (!isMuted) {
            videoRef.current!.muted = true;
            videoRef.current!.play();
          }
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive, isMuted]);

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

      // Inside VideoPlayer return:
      <div 
        onClick={() => toggleMute()} // You would pass the toggle function as a prop
        className="absolute inset-0 z-20 flex items-center justify-center"
      >
        {/* Briefly show a speaker icon when they toggle */}
        {showIcon && (
          <div className="p-4 rounded-full bg-black/50 text-white animate-out fade-out zoom-out duration-700">
            {isMuted ? <VolumeX size={48} /> : <Volume2 size={48} />}
          </div>
        )}
      </div>
    </div>
  );
}