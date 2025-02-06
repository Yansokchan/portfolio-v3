import { motion } from "framer-motion";
import {
  CodeBracketIcon,
  CpuChipIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
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
            <motion.div
              key={index}
              className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-lg border border-white/10"
              data-aos="zoom-in"
              whileHover={{ y: -10 }}
            >
              <item.icon className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-xl text-cyan-400 font-bold mb-2">
                {item.title}
              </h3>
              <p className="text-gray-300">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
