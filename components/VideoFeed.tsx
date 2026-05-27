"use client";
import { useState, useEffect, useRef } from "react";
import { VIDEO_DATA } from "../lib/constants";
import VideoPlayer from "../components/VideoPlayer";

const CLOUDFRONT_URL = process.env.NEXT_PUBLIC_CLOUDFRONT_URL;

// We triple the data to create the illusion of infinity
const TRIPLE_DATA = [...VIDEO_DATA, ...VIDEO_DATA, ...VIDEO_DATA];

export default function VideoFeed() {
  const [activeIndex, setActiveIndex] = useState(VIDEO_DATA.length); // Start at the middle set
  const containerRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
    // 1. Initial jump to the middle of the triple list on load
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.offsetHeight * VIDEO_DATA.length;
    }

    // 2. Intersection Observer to track which video is active
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setActiveIndex(index);
          }
        });
      },
      { threshold: 0.6 } // High threshold for precise detection
    );

    const sections = document.querySelectorAll(".video-section");
    sections.forEach((s) => observer.observe(s));

    return () => observer.disconnect();
  }, []);

  const handleScroll = () => {
    if (!containerRef.current) return;

    const { scrollTop, offsetHeight } = containerRef.current;
    const singleSetHeight = offsetHeight * VIDEO_DATA.length;

    // 3. Infinite Loop Teleportation Logic
    // If we reach the start of the 3rd set, jump back to start of 2nd set
    if (scrollTop >= singleSetHeight * 2) {
      containerRef.current.scrollTop = scrollTop - singleSetHeight;
    } 
    // If we reach the end of the 1st set (scrolling up), jump to end of 2nd set
    else if (scrollTop <= 0) {
      containerRef.current.scrollTop = singleSetHeight;
    }
  };

  return (
    <main
      ref={containerRef}
      onScroll={handleScroll}
      className="h-[100dvh] w-full overflow-y-scroll snap-y snap-mandatory bg-black scroll-smooth"
    >
      {TRIPLE_DATA.map((item, index) => {
        // PROXIMITY LOGIC
        const isActive = index === activeIndex;
        const isNearby = Math.abs(index - activeIndex) === 1;

        return (
          <div 
            key={index} 
            data-index={index} 
            className="video-section h-[100dvh] w-full snap-start"
          >
            <VideoPlayer
              src={`${CLOUDFRONT_URL}/${item.video}`}
              poster={`${CLOUDFRONT_URL}/${item.thumb}`}
              isActive={isActive}
              isNearby={isNearby}
            />
          </div>
        );
      })}
    </main>
  );
}