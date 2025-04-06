import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useState } from "react";

const Aurora = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for interactive movement
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Transform motion values for smooth movement
  const rotateX = useTransform(mouseY, [-100, 100], [30, -30]);
  const rotateY = useTransform(mouseX, [-100, 100], [-30, 30]);

  // Spring animations for smooth transitions
  const springConfig = { damping: 20, stiffness: 100 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    mouseX.set(event.clientX - centerX);
    mouseY.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <div
      className="absolute inset-0 z-10"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="absolute h-full w-full"
        style={{
          background: isHovered
            ? "radial-gradient(circle at center, #60a5fa 1px, transparent 1px), radial-gradient(circle at center, #22d3ee 1px, transparent 1px)"
            : "radial-gradient(circle at center, #e5e7eb 1px, transparent 1px)",
          backgroundSize: "16px 16px, 16px 16px",
          backgroundPosition: "0 0, 8px 8px",
          rotateX: springRotateX,
          rotateY: springRotateY,
        }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: isHovered ? 0.4 : 0.2,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{
          duration: 0.5,
          delay: 0.5,
          scale: { duration: 0.3 },
        }}
      />
      {/* Add a subtle glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isHovered ? 0.3 : 0.1,
          scale: isHovered ? 1.2 : 1,
        }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
};

export default Aurora;
