import { motion } from "framer-motion";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import TrueFocus from "./TextAnimations/TrueFocus/TrueFocus";
import { useState, useEffect } from "react";
import Magnet from "./Animations/Magnet/Magnet";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  useGLTF,
  useAnimations,
} from "@react-three/drei";
import workModel from "../assets/work.glb";

function Model({ isMobile }) {
  const { scene, animations } = useGLTF(workModel);
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    // Play all animations
    Object.values(actions).forEach((action) => {
      action.reset().play();
    });
  }, [actions]);

  return (
    <primitive
      object={scene}
      scale={isMobile ? [0.5, 0.5, 0.5] : [0.2, 0.2, 0.2]}
      position={isMobile ? [0, 0, 1] : [0, 0, 1]}
    />
  );
}

const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      id="home"
      className="mt-12 mx-5 min-h-screen flex items-center justify-center relative px-4 overflow-hidden"
    >
      <div className="container mx-auto z-50">
        <motion.div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          {/* Left Side - Text Content */}
          <div className="flex-1 text-left max-w-xl">
            <motion.div
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center">
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
                className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6"
              >
                Frontend developer specializing in modern web technologies.{" "}
                Passionate about creating intuitive user experiences with
                cutting-edge tools.
              </p>
              <div className="flex">
                <a href="#portfolio">
                  <Magnet padding={70} disabled={false} magnetStrength={5}>
                    <motion.button
                      className="px-6 sm:px-8 py-2 sm:py-3 rounded-full bg-transparent border-2 border-blue-500 text-blue-400 hover:bg-blue-500/10 transition-all relative overflow-hidden group"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="relative z-10 flex items-center gap-2 text-sm sm:text-base">
                        View Projects
                        <ArrowTopRightOnSquareIcon className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" />
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
              </div>
            </motion.div>
          </div>

          {/* Right Side - 3D Model */}
          <div className="flex-1 w-full aspect-[4/3] sm:aspect-[4/3] md:aspect-[4/3] lg:aspect-[4/3]">
            <Canvas
              camera={{
                position: isMobile ? [0, 20, 17] : [0, 2, 9],
                fov: isMobile ? 18 : 25,
              }}
              style={{
                width: "100%",
                height: "100%",
                position: "relative",
                display: "block",
              }}
              gl={{
                antialias: true,
                alpha: true,
                powerPreference: "high-performance",
              }}
            >
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <Model isMobile={isMobile} />
              <OrbitControls
                enableZoom={false}
                minPolarAngle={Math.PI / 2.5}
                maxPolarAngle={Math.PI / 1.5}
                enableDamping={true}
                dampingFactor={0.03}
                rotateSpeed={0.5}
                panSpeed={0.5}
                target={[0, 0, 0]}
                makeDefault
              />
              <Environment preset="city" />
            </Canvas>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
