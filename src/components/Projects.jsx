import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import projects from "./data/projects.js";
import { useState } from "react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import Skills from "./Skills.jsx";
import { FaProjectDiagram, FaTools, FaCode } from "react-icons/fa";

const ProjectCard = ({ project }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Subtle rotation values
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  // Smooth spring animation
  const springConfig = { damping: 25, stiffness: 150 };
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
      className="group relative overflow-hidden rounded-2xl bg-gray-800/50 backdrop-blur-lg border border-white/10 hover:border-blue-500/30 hover:border transition-all"
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Project Image */}
      <motion.div
        className="relative h-64 overflow-hidden"
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
      >
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          style={{ transform: "translateZ(20px)" }}
        />
      </motion.div>

      {/* Project Content */}
      <motion.div
        className="p-4 relative z-10"
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
      >
        <motion.h3
          className="text-xl text-cyan-400 font-bold mb-2"
          style={{ transform: "translateZ(30px)" }}
        >
          {project.title}
        </motion.h3>
        <motion.p
          className="text-gray-300 mb-4"
          style={{ transform: "translateZ(20px)" }}
        >
          {project.description}
        </motion.p>
        <motion.a
          target="blank"
          href={project.link}
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 group"
          whileHover={{ x: 5 }}
          style={{ transform: "translateZ(30px)" }}
        >
          <span>Live Demo</span>
          <ArrowTopRightOnSquareIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </motion.a>
      </motion.div>

      {/* Subtle hover effect overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          transform: "translateZ(0)",
        }}
      />
    </motion.div>
  );
};

const Projects = () => {
  const [activeSection, setActiveSection] = useState("projects");

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 0 15px rgba(59, 130, 246, 0.4)",
    },
    tap: { scale: 0.95 },
  };

  return (
    <section id="portfolio" className="py-20 px-4 mx-5">
      <div className="container mx-auto">
        <h2 className="text-3xl text-cyan-400 md:text-4xl font-bold mb-5 text-center">
          Portfolio Showcase
        </h2>
        <h1 className="text-[20px] text-gray-400 text-center mb-20 ">
          Explore my journey through projects and technical expertise. Each
          section represents a milestone in my continuous learning path.
        </h1>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex justify-center"
        >
          <div className="bg-white/5 backdrop-blur-lg rounded-xl 460:p-3 220:p-2 border border-white/10 shadow-lg">
            <div className="flex 460:gap-5 220:gap-3 460:px-2 220:px-1">
              {/* Projects Button */}
              <motion.button
                onClick={() => setActiveSection("projects")}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className={`relative 460:px-10 460:py-4 220:px-4 220:py-2 rounded-lg transition-all flex items-center gap-2 ${
                  activeSection === "projects"
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                    : "bg-transparent text-gray-300 hover:text-white"
                }`}
              >
                {activeSection === "projects" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-lg border border-white/20"
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                )}
                <FaProjectDiagram className="text-lg" />
                Projects
              </motion.button>

              {/* Skills Button */}
              <motion.button
                onClick={() => setActiveSection("skills")}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className={`relative 460:px-10 460:py-4 220:px-4 220:py-2 rounded-lg transition-all flex items-center gap-2 ${
                  activeSection === "skills"
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                    : "bg-transparent text-gray-300 hover:text-white"
                }`}
              >
                {activeSection === "skills" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute font-semibold inset-0 rounded-lg border border-white/20"
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                )}
                <FaTools className="text-lg" />
                Tech Stack
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
      {activeSection === "projects" && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
      {activeSection === "skills" && <Skills />}
    </section>
  );
};

export default Projects;
