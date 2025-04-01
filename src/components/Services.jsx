import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import {
  CodeBracketIcon,
  CpuChipIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

const ServiceCard = ({ icon: Icon, title, text, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const springConfig = { damping: 15, stiffness: 150 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-lg border border-white/10 relative overflow-hidden group"
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Hover effect overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          transform: "translateZ(0)",
        }}
      />

      <motion.div
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative z-10"
      >
        <motion.div className="mb-4" style={{ transform: "translateZ(20px)" }}>
          <Icon className="h-12 w-12 text-blue-400" />
        </motion.div>
        <motion.h3
          className="text-xl text-cyan-400 font-bold mb-2"
          style={{ transform: "translateZ(30px)" }}
        >
          {title}
        </motion.h3>
        <motion.p
          className="text-gray-300"
          style={{ transform: "translateZ(20px)" }}
        >
          {text}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-20 relative px-4 mx-5">
      <div className="container mx-auto">
        <h2
          className="text-3xl text-cyan-400 md:text-4xl font-bold mb-16 text-center"
          data-aos="fade-up"
        >
          What I Do
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: CodeBracketIcon,
              title: "Web Development",
              text: "Modern web applications with React & Next.js",
            },
            {
              icon: CpuChipIcon,
              title: "UI/UX Design",
              text: "User-centered interfaces with Figma & Framer",
            },
            {
              icon: SparklesIcon,
              title: "Animation",
              text: "Interactive experiences with GSAP & Framer Motion",
            },
          ].map((item, index) => (
            <ServiceCard key={index} {...item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
