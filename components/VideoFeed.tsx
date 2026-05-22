"use client";
import { useState, useEffect, useRef } from "react";
import { VIDEO_FEED } from "../lib/constants";
import VideoPlayer from "../components/VideoPlayer";

const CLOUDFRONT_URL = process.env.NEXT_PUBLIC_CLOUDFRONT_URL;


export default function VideoFeed() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(Number(entry.target.getAttribute("data-id")));
          }
        });
      },
      { threshold: 0.7 } // Trigger when 70% of video is visible
    );

    const elements = document.querySelectorAll(".video-section");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main 
      ref={containerRef}
      className="h-[100dvh] w-full overflow-y-scroll snap-y snap-mandatory bg-black"
    >
      {VIDEO_FEED.map((item) => (
        <div   
          key={item.id} 
          data-id={item.id} 
          className="video-section h-[100dvh] w-full snap-start"
        >
          <VideoPlayer
            src={`${CLOUDFRONT_URL}/${item.video}`}
            poster={`${CLOUDFRONT_URL}/${item.thumb}`}
            isActive={activeId === item.id}
          />
        </div>
      ))}
    </main>
  );
}