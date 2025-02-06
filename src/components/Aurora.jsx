import { motion } from "framer-motion";

const Aurora = () => {
  return (
    <div className="absolute inset-0 z-10">
      <motion.div
        className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      />
    </div>
  );
};

export default Aurora;
