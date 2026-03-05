import { useRef, useEffect, useState } from "react";
import { useAnimationFrame } from "framer-motion";

interface AnimatedBorderCardProps {
  children: React.ReactNode;
  className?: string;
  /** How fast the beam spins — lower = faster. Default 8 */
  speed?: number;
  /** Border-radius class. Default 'rounded-2xl' */
  radius?: string;
}

const AnimatedBorderCard = ({
  children,
  className = "",
  speed = 8,
  radius = "rounded-2xl",
}: AnimatedBorderCardProps) => {
  const spinRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  // Detect if screen is desktop size (>= 1024px)
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    // Check on mount
    checkScreenSize();
    
    // Add resize listener
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Only run animation on desktop
  useAnimationFrame((t) => {
    if (!isDesktop) return; // Skip animation on mobile/tablet
    
    const angle = (t / speed) % 360;
    const gradient = `conic-gradient(from ${angle}deg at 50% 50%,
      transparent 0deg,
      transparent 60deg,
      #a855f7 100deg,
      #ffffff 130deg,
      #ec4899 160deg,
      transparent 200deg,
      transparent 360deg
    )`;
    if (spinRef.current) spinRef.current.style.background = gradient;
  });

  return (
    // Strict boundary container - nothing escapes this
    <div 
      className={`relative ${radius} ${className}`}
      style={{ 
        overflow: 'hidden',
        isolation: 'isolate'
      }}
    >
      {/* Inner wrapper with border gap */}
      <div className="relative p-[2px] h-full">
        {/* Spinning beam ring - clipped by parent */}
        <div 
          ref={spinRef} 
          className={`absolute inset-0 ${radius} ${!isDesktop ? 'bg-gradient-to-br from-purple-500/30 to-pink-500/30' : ''}`}
        />
        {/* Dark content area */}
        <div 
          className={`relative z-10 ${radius} bg-[#080b14] h-full`}
          style={{ overflow: 'hidden' }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default AnimatedBorderCard;
