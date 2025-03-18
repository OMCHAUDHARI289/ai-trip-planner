import { useEffect, useRef } from "react";

export const Marquee = ({ children, speed = 30, pauseOnHover = false, repeat = 2 }) => {
  const marqueeRef = useRef(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    let animationId;
    let scrollSpeed = speed;

    const animate = () => {
      if (marquee) {
        marquee.scrollLeft += 1;
        if (marquee.scrollLeft >= marquee.scrollWidth / repeat) {
          marquee.scrollLeft = 0;
        }
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);

    if (pauseOnHover) {
      marquee.addEventListener("mouseenter", () => cancelAnimationFrame(animationId));
      marquee.addEventListener("mouseleave", () => (animationId = requestAnimationFrame(animate)));
    }

    return () => cancelAnimationFrame(animationId);
  }, [speed, pauseOnHover, repeat]);

  return (
    <div ref={marqueeRef} className="overflow-hidden whitespace-nowrap relative w-full">
      <div className="flex gap-4">
        {Array(repeat)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="flex gap-4">
              {children}
            </div>
          ))}
      </div>
    </div>
  );
};
