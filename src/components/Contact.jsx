import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaTelegram } from "react-icons/fa";
import { LinkedinIcon, InstagramIcon } from "./Socialicons";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ArrowTopRightOnSquareIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { IoIosSend } from "react-icons/io";
import { VscCheckAll } from "react-icons/vsc";
import { FaCheckCircle, FaTimes } from "react-icons/fa";
import { useMotionValue, useTransform, useSpring } from "framer-motion";

const SuccessAlert = ({ message, onClose }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const duration = 3000; // 3 seconds
    const interval = 10; // Update every 10ms
    const steps = duration / interval;
    const decrement = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          onClose();
          return 0;
        }
        return prev - decrement;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.95 }}
      transition={{
        type: "spring",
        damping: 25,
        stiffness: 200,
        mass: 0.8,
      }}
      className="fixed bottom-4 right-4 bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50 min-w-[300px] max-w-[400px] overflow-hidden border border-white/10 backdrop-blur-sm"
    >
      <div className="relative">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            damping: 15,
            stiffness: 200,
            mass: 0.8,
          }}
          className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
        >
          <FaCheckCircle className="text-xl" />
        </motion.div>
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            delay: 0.2,
            type: "spring",
            damping: 15,
            stiffness: 200,
            mass: 0.8,
          }}
          className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center"
        >
          <FaCheckCircle className="text-xs text-blue-500" />
        </motion.div>
      </div>

      <div className="flex-1">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: 0.1,
            type: "spring",
            damping: 20,
            stiffness: 200,
          }}
          className="font-medium"
        >
          {message}
        </motion.p>
        <motion.div
          initial={{ scaleX: 1 }}
          animate={{ scaleX: progress / 100 }}
          transition={{ duration: 0.1, ease: "linear" }}
          className="absolute bottom-0 left-0 right-0 h-1 bg-white/30"
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClose}
        className="text-white/70 hover:text-white transition-colors"
      >
        <FaTimes />
      </motion.button>
    </motion.div>
  );
};

const ContactCard = ({
  icon: Icon,
  title,
  children,
  gradientColors,
  iconColor,
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

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
      className="517:p-6 220:p-3 rounded-2xl bg-gray-800/50 backdrop-blur-lg border border-white/10 relative overflow-hidden group"
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
    >
      {/* Color blend animation */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${gradientColors} opacity-0 group-hover:opacity-100 transition-opacity`}
        style={{ transform: "translateZ(0)" }}
      />

      <motion.div
        className="flex items-center gap-4 relative z-10"
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
      >
        <motion.div
          className="p-3 rounded-full bg-blue-500/10"
          style={{ transform: "translateZ(30px)" }}
        >
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </motion.div>
        <motion.div style={{ transform: "translateZ(20px)" }}>
          <h3 className="text-xl font-bold mb-1 text-white">{title}</h3>
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const formRef = useRef();
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("web-development");

  const services = [
    { value: "Web Development", label: "Web Development" },
    { value: "UI/UX Design", label: "UI/UX Design" },
    { value: "Animation", label: "Animation" },
    { value: "Consultation", label: "Consultation" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: "68a4d70f-7e45-422f-bf56-42afeed37f1c",
          name: formData.get("name"),
          email: formData.get("email"),
          service: selectedService,
          message: formData.get("message"),
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSubmitStatus("success");
        e.target.reset();
        setTimeout(() => setSubmitStatus(null), 5000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 mx-5 relative">
      {/* Container */}
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          className="text-cyan-400 text-3xl md:text-4xl font-bold mb-5 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Let's Work Together
        </motion.h2>
        <h1
          data-aos="fade-up"
          className="text-[20px] text-gray-400 mb-20 text-center"
        >
          Got a question? Send me a message, and I'll get back to you soon.
        </h1>
        <div className="grid lg:grid-cols-2 220:grid-cols-1 1115:gap-12 220:gap-8">
          {/* Contact Information */}
          <div
            data-aos="zoom-in"
            data-aos-duration="500"
            className="space-y-6 p-6 rounded-3xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-lg border-2 border-white/10 shadow-2xl hover:shadow-3xl transition-shadow"
          >
            <motion.div className="space-y-4">
              <h1
                className="text-2xl text-cyan-400 font-bold mb-6 text-center"
                data-aos="zoom-out"
              >
                Connect With ME
              </h1>

              <ContactCard
                icon={EnvelopeIcon}
                title="Direct Email"
                gradientColors="from-blue-600/10 via-red-500/15 to-yellow-600/10"
                iconColor="text-cyan-500"
                data-aos="zoom-out"
              >
                <a
                  href="mailto:yansokchan05@gmail.com?subject=Portfolio Inquiry&body=Hello, I came across your portfolio and would like to discuss a project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-blue-400 transition-colors flex 474:flex-row 220:flex-col 220:items-start items-center gap-2"
                >
                  <span className="text-cyan-400">click here.</span>
                </a>
              </ContactCard>

              <div className="grid 517:space-y-0 gap-x-5 517:grid-cols-2 220:grid-cols-1 220:space-y-4">
                <a
                  data-aos="zoom-out"
                  href="https://t.me/YanSokchan"
                  target="_blank"
                >
                  <ContactCard
                    icon={FaTelegram}
                    title="Telegram"
                    gradientColors="from-blue-500/15 to-cyan-600/20"
                    iconColor="text-blue-400"
                  >
                    <div className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
                      Sokchan Yan
                    </div>
                  </ContactCard>
                </a>

                <a
                  data-aos="zoom-out"
                  href="https://www.linkedin.com/in/sokchan-yan-74277b335?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  target="_blank"
                >
                  <ContactCard
                    icon={FaLinkedin}
                    title="LinkedIn"
                    gradientColors="from-cyan-500/20 to-gray-500/10"
                    iconColor="text-blue-400"
                  >
                    <div className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
                      Sokchan Yan
                    </div>
                  </ContactCard>
                </a>
              </div>

              <ContactCard
                icon={InstagramIcon}
                title="Instagram"
                gradientColors="from-red-500/15 via-yellow-200/15 to-purple-500/15"
                iconColor="text-red-400"
                data-aos="zoom-out"
              >
                <a
                  href="https://www.instagram.com/ouknhachan?igsh=cXoyenZrd2hhdnI4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2"
                >
                  TO NG <span className="text-cyan-400">click here.</span>
                </a>
              </ContactCard>

              <ContactCard
                icon={PhoneIcon}
                title="Phone"
                gradientColors="from-green-500/15 to-cyan-500/15"
                iconColor="text-green-500"
                data-aos="zoom-out"
              >
                <div className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
                  +855 | 97 5948 051
                </div>
              </ContactCard>

              <ContactCard
                icon={MapPinIcon}
                title="Location"
                gradientColors="from-cyan-600/15 to-red-500/10"
                iconColor="text-blue-600"
                data-aos="zoom-out"
              >
                <div className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
                  Khan Chbar Ampov, Phnom Penh, Cambodia.
                </div>
              </ContactCard>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.form
            className="space-y-6 p-8 rounded-3xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-lg border-2 border-white/10 shadow-2xl hover:shadow-3xl transition-shadow"
            onSubmit={handleSubmit}
            data-aos="flip-down"
          >
            {" "}
            <h3
              data-aos="zoom-in"
              data-aos-delay="300"
              className="text-2xl text-cyan-400 font-bold mb-6 text-center"
            >
              Have a project in mind?
            </h3>
            <input
              type="hidden"
              name="access_key"
              value="68a4d70f-7e45-422f-bf56-42afeed37f1c"
            />
            <input type="checkbox" name="botcheck" className="hidden" />
            {/* Name Input */}
            <div data-aos="zoom-in" data-aos-delay="300">
              <label htmlFor="name" className="block text-gray-300 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full text-white px-4 py-3 bg-gray-800/50 backdrop-blur-lg border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                required
                disabled={isSubmitting}
              />
            </div>
            {/* Email Input */}
            <div data-aos="zoom-in" data-aos-delay="300">
              <label htmlFor="email" className="block text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full text-white px-4 py-3 bg-gray-800/50 backdrop-blur-lg border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                required
                disabled={isSubmitting}
              />
            </div>
            {/* Enhanced Service Input */}
            <div className="mb-6">
              <label htmlFor="service" className="block text-gray-300 mb-2">
                Service
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsServiceOpen(!isServiceOpen)}
                  className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-lg border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-left"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">
                      {services.find((s) => s.value === selectedService)?.label}
                    </span>
                    <motion.div
                      animate={{ rotate: isServiceOpen ? 180 : 0 }}
                      transition={{ duration: 0.05 }}
                    >
                      <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                    </motion.div>
                  </div>
                </button>

                <motion.div
                  className="absolute z-10 w-full mt-2 origin-top"
                  initial={{ opacity: 0, y: -10, scaleY: 0 }}
                  animate={{
                    opacity: isServiceOpen ? 1 : 0,
                    y: isServiceOpen ? 0 : -10,
                    scaleY: isServiceOpen ? 1 : 0,
                  }}
                  transition={{ duration: 0.05 }}
                  style={{ pointerEvents: isServiceOpen ? "auto" : "none" }}
                >
                  <div className="bg-gray-800 bg-gradient-to-r from-blue-600/20 to-cyan-500/25 backdrop-blur-lg border border-white/20 rounded-lg overflow-hidden">
                    {services.map((service) => (
                      <motion.div
                        key={service.value}
                        whileHover={{
                          backgroundColor: "rgba(59, 130, 246, 0.1)",
                        }}
                        transition={{ duration: 0.05 }}
                        className="px-4 py-3 cursor-pointer"
                        onClick={() => {
                          setSelectedService(service.value);
                          setIsServiceOpen(false);
                        }}
                      >
                        <span className="text-gray-300">{service.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
              <input
                type="hidden"
                required
                name="service"
                value={selectedService}
              />
            </div>
            {/* Message Input */}
            <div data-aos="zoom-in" data-aos-delay="300">
              <label htmlFor="message" className="block text-gray-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="w-full px-4 py-3 text-white bg-gray-800/50 backdrop-blur-lg border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                required
                disabled={isSubmitting}
              ></textarea>
            </div>
            {/* Submit Button with Pulsating Glow */}
            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-lg relative overflow-hidden"
              disabled={isSubmitting}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.95 }}
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              <div className="flex items-center gap-3 justify-center">
                <IoIosSend />
                <span className="relative font-semibold  ">
                  {isSubmitting ? "Sending..." : "Send Message"}
                </span>
              </div>
            </motion.button>
          </motion.form>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {submitStatus === "success" && (
          <SuccessAlert
            message="Message sent successfully!"
            onClose={() => setSubmitStatus(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ContactSection;
