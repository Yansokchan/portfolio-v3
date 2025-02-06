import { motion } from "framer-motion";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import pf from "../assets/profile0.png";
import TrueFocus from "./TextAnimations/TrueFocus/TrueFocus";
import { useState } from "react";
import Magnet from "./Animations/Magnet/Magnet";
const HeroSection = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setTilt({
      x: (x - rect.width / 2) / 25,
      y: (y - rect.height / 2) / 25,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section
      id="home"
      className="mt-12 mx-5 min-h-screen flex items-center justify-center relative px-4 overflow-hidden"
    >
      <div className="container mx-auto text-center z-50">
        <motion.div className="flex flex-col items-center">
          {/* Profile Image with Animated Border and Box-Shadow */}

          <div
            data-aos="zoom-in"
            className="flex m-5 items-center justify-center "
          >
            <div
              className="relative h-52 w-52 rounded-full"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Rotating gradient border */}
              <div className="absolute -inset-1 rounded-full animate-rotate bg-[conic-gradient(#ff0000,#ff7300,#fffb00,#48ff00,#00ffd5,#002bff,#7a00ff,#ff00c8,#ff0000)]" />
              {/* Image container */}
              <div
                className="relative h-full w-full rounded-full overflow-hidden transition-transform duration-300 hover:scale-105"
                style={{
                  transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
                }}
              >
                <img
                  src={pf}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* About Me Section */}
          <motion.div
            className="my-4 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {" "}
            <div className="flex items-center justify-center">
              <TrueFocus
                sentence="CHAN TONG"
                manualMode={false}
                blurAmount={8}
                borderColor="cyan"
                pauseBetweenAnimations={2}
              />
            </div>
            <p
              data-aos="fade-up"
              className="text-xl md:text-2xl text-gray-300 mb-3"
            >
              Frontend developer specializing in modern web technologies.{" "}
              {/* Replace with your bio */}
              Passionate about creating intuitive user experiences with
              cutting-edge tools.
            </p>
          </motion.div>

          {/* View Projects Button */}
          <a href="#portfolio">
            <Magnet padding={70} disabled={false} magnetStrength={5}>
              <motion.button
                className="px-8 py-3 rounded-full bg-transparent border-2 border-blue-500 text-blue-400 hover:bg-blue-500/10 transition-all relative overflow-hidden group"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Projects
                  <ArrowTopRightOnSquareIcon className="h-5 w-5  group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-10 transition-opacity"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </motion.button>
            </Magnet>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
