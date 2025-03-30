import { motion } from "framer-motion";
import { FaReact, FaHtml5, FaCss3Alt, FaJs, FaGithub } from "react-icons/fa";
import { SiVite, SiTailwindcss, SiMaterialdesign } from "react-icons/si";
import { GiSpiderWeb } from "react-icons/gi";
import Bootstrap from "./logo/Bootstrap.png";
import CSS from "./logo/CSS3.png";
import daisyui from "./logo/daisyui.png";
import github from "./logo/github.png";
import gsap from "./logo/gsap.png";
import html from "./logo/HTML5.png";
import js from "./logo/JavaScript.png";
import Material from "./logo/Material.png";
import react from "./logo/React.png";
import sweet from "./logo/SweetAlert.png";
import tailwind from "./logo/Tailwind.png";
import vite from "./logo/Vite.png";
const Skills = () => {
  const skills = [
    {
      name: "React",
      delay: 100,
      icon: react,
    },
    {
      name: "HTML",
      delay: 200,
      icon: html,
    },
    {
      name: "CSS",
      delay: 300,
      icon: CSS,
    },
    {
      name: "JavaScript",
      delay: 400,
      icon: js,
    },
    {
      name: "Vite",
      delay: 500,
      icon: vite,
    },
    {
      name: "Tailwind",
      delay: 600,
      icon: tailwind,
    },
    {
      name: "Material UI",
      delay: 700,
      icon: Material,
    },
    {
      name: "DaisyUI",
      delay: 800,
      icon: daisyui,
    },
    {
      name: "GitHub",
      delay: 900,
      icon: github,
    },
    {
      name: "Sweet Alert",
      delay: 1000,
      icon: sweet,
    },
    {
      name: "GSAP",
      delay: 1100,
      icon: gsap,
    },
    {
      name: "Bootstrap",
      delay: 1200,
      icon: Bootstrap,
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {skills.map((skill, index) => (
        <motion.div
          key={index}
          className="relative bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-md rounded-xl 394:p-6 220:p-4 border border-white/10 hover:border-transparent transition-all duration-300 group"
          data-aos="flip-left"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="700"
        >
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

          {/* Glowing border effect */}
          <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-400/30 rounded-xl transition-all duration-500" />

          {/* Content */}
          <div className="relative flex flex-col items-center gap-3 z-10">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="p-2 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20"
            >
              <img className="w-9 h-9" src={skill.icon} alt={skill.name} />
            </motion.div>
            <h3 className="394:text-lg 220:text-[16px] font-semibold text-white/90 group-hover:text-white transition-colors">
              {skill.name}
            </h3>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Skills;
