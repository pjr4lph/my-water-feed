"use client";
import { useState, useEffect, useRef } from "react";
import VideoPlayer from "../components/VideoPlayer";

const CLOUDFRONT_URL = "https://your-id.cloudfront.net";

const videoData = [
  { id: 1, video: "1.mp4", thumb: "1.jpg" },
  { id: 2, video: "2.mp4", thumb: "2.jpg" },
  // ... add up to 10
];

export default function Home() {
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
      {videoData.map((item) => (
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