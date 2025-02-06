import { motion } from "framer-motion";
import projects from "./data/projects.js";
import { useState } from "react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import Skills from "./Skills.jsx";
import { FaProjectDiagram, FaTools, FaCode } from "react-icons/fa";
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
                <FaProjectDiagram className="text-lg" /> {/* Project Icon */}
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
                <FaTools className="text-lg" /> {/* Skills Icon */}
                Tech Stack
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
      {activeSection === "projects" && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="group relative overflow-hidden rounded-2xl bg-gray-800/50 backdrop-blur-lg border border-white/10 hover:border-blue-500/30 hover:border transition-all"
              data-aos="flip-up"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="1300"
            >
              {/* Project Image */}
              <div className="relative h-64 overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Project Content */}
              <div className="p-4">
                <h3 className="text-xl text-cyan-400 font-bold mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <motion.a
                  target="blank"
                  href={project.link}
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 group"
                  whileHover={{ x: 5 }}
                >
                  <span>Live Demo</span>
                  <ArrowTopRightOnSquareIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </motion.a>
              </div>

              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </div>
      )}
      {activeSection === "skills" && <Skills />}
      {/* Hover Glow Effect */}
    </section>
  );
};

export default Projects;
