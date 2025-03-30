import { motion } from "framer-motion";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ArrowTopRightOnSquareIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { IoIosSend } from "react-icons/io";
import { VscCheckAll } from "react-icons/vsc";
import {
  LinkedinIcon,
  TelegramIcon,
  InstagramIcon,
} from "../components/SocialIcons";
import { useState } from "react";
const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
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
        setSuccess(true);
        e.target.reset();
        setTimeout(() => setSuccess(false), 5000);
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
              <motion.div
                className="517:p-6 220:p-3 rounded-2xl bg-gray-800/50 backdrop-blur-lg border border-white/10 relative overflow-hidden group "
                whileHover={{ scale: 1.02 }}
                data-aos="zoom-out"
              >
                {/* Color blend animation */}
                <motion.div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-red-500/15 to-yellow-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex items-center gap-4 relative z-10">
                  <motion.div
                    className="p-3 rounded-full bg-blue-500/10 backdrop-blur-lg"
                    whileHover={{ rotate: 15, scale: 1.1 }}
                  >
                    <EnvelopeIcon className="h-6 w-6 text-cyan-500" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold mb-1 text-white">
                      Direct Email
                    </h3>

                    <a
                      href="mailto:yansokchan05@gmail.com?subject=Portfolio Inquiry&body=Hello, I came across your portfolio and would like to discuss a project."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-blue-400 transition-colors flex 474:flex-row 220:flex-col 220:items-start items-center gap-2"
                    >
                      <span className="text-cyan-400">click here.</span>
                      <ArrowTopRightOnSquareIcon className="517:h-6 517:w-6 220:h-5 220:w-5 text-blue-400 absolute 517:-top-3 220:-top-1 517:-right-1 220:-right-0 -translate-x-2 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all" />
                    </a>
                  </div>
                </div>
              </motion.div>
              <div className="grid 517:space-y-0 gap-x-5 517:grid-cols-2 220:grid-cols-1 220:space-y-4">
                <a
                  data-aos="zoom-out"
                  href="https://t.me/YanSokchan"
                  target="_blank"
                >
                  <motion.div
                    className="517:p-6 220:p-3 rounded-2xl bg-gray-800/50 backdrop-blur-lg border border-white/10 relative overflow-hidden group "
                    whileHover={{ scale: 1.02 }}
                  >
                    {/* Color blend animation */}
                    <motion.div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="flex items-center gap-4 relative z-10">
                      <motion.div
                        className="p-3 rounded-full bg-blue-500/10 backdrop-blur-lg"
                        whileHover={{ rotate: 15, scale: 1.1 }}
                      >
                        <TelegramIcon className="h-6 w-6 text-blue-400" />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-bold mb-1 text-white">
                          Telegram
                        </h3>

                        <div
                          rel="noopener noreferrer"
                          className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2"
                        >
                          Sokchan Yan
                          <ArrowTopRightOnSquareIcon className="517:h-6 517:w-6 220:h-5 220:w-5 text-blue-400 absolute 517:-top-3 220:-top-1 517:-right-1 220:-right-0 -translate-x-2 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </a>
                <a
                  data-aos="zoom-out"
                  href="https://www.linkedin.com/in/sokchan-yan-74277b335?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  target="_blank"
                >
                  <motion.div
                    className="517:p-6 220:p-3 rounded-2xl bg-gray-800/50 backdrop-blur-lg border border-white/10 relative overflow-hidden group "
                    whileHover={{ scale: 1.02 }}
                  >
                    {/* Color blend animation */}
                    <motion.div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-gray-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="flex items-center gap-4 relative z-10">
                      <motion.div
                        className="p-3 rounded-full bg-blue-500/10 backdrop-blur-lg"
                        whileHover={{ rotate: 15, scale: 1.1 }}
                      >
                        <LinkedinIcon className="h-6 w-6 text-blue-400" />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-bold mb-1 text-white">
                          LinkedIn
                        </h3>

                        <div
                          rel="noopener noreferrer"
                          className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2"
                        >
                          Sokchan Yan
                          <ArrowTopRightOnSquareIcon className="517:h-6 517:w-6 220:h-5 220:w-5 text-blue-400 absolute 517:-top-3 220:-top-1 220:-right-0 517:-right-1 -translate-x-2 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </a>
              </div>
              <motion.div
                data-aos="zoom-out"
                className="517:p-6 220:p-3 rounded-2xl bg-gray-800/50 backdrop-blur-lg border border-white/10 relative overflow-hidden group "
                whileHover={{ scale: 1.02 }}
              >
                {/* Color blend animation */}
                <motion.div className="absolute inset-0 bg-gradient-to-r from-red-500/15 via-yellow-200/15 to-purple-500/15 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex items-center gap-4 relative z-10">
                  <motion.div
                    className="p-3 rounded-full bg-blue-500/10 backdrop-blur-lg"
                    whileHover={{ rotate: 15, scale: 1.1 }}
                  >
                    <InstagramIcon className="h-6 w-6 text-red-400" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold mb-1 text-white">
                      Instagram
                    </h3>

                    <a
                      href="https://www.instagram.com/ouknhachan?igsh=cXoyenZrd2hhdnI4"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2"
                    >
                      TO NG <span className="text-cyan-400">click here.</span>
                      <ArrowTopRightOnSquareIcon className="517:h-6 517:w-6 220:h-5 220:w-5 text-blue-400 absolute 517:-top-3 220:-top-1 220:-right-0 517:-right-1 -translate-x-2 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all" />
                    </a>
                  </div>
                </div>
              </motion.div>

              <motion.div
                data-aos="zoom-out"
                className="517:p-6 220:p-3 rounded-2xl bg-gray-800/50 backdrop-blur-lg border border-white/10 relative overflow-hidden group "
                whileHover={{ scale: 1.02 }}
              >
                {/* Color blend animation */}
                <motion.div className="absolute inset-0 bg-gradient-to-r from-green-500/15 to-cyan-500/15 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex items-center gap-4 relative z-10">
                  <motion.div
                    className="p-3 rounded-full bg-blue-500/10 backdrop-blur-lg"
                    whileHover={{ rotate: 15, scale: 1.1 }}
                  >
                    <PhoneIcon className="h-6 w-6 text-green-500" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold mb-1 text-white">Phone</h3>

                    <a
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2"
                    >
                      +855 | 97 5948 051
                      <ArrowTopRightOnSquareIcon className="517:h-6 517:w-6 220:h-5 220:w-5 text-blue-400 absolute 517:-top-3 220:-top-1 220:-right-0 517:-right-1 -translate-x-2 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all" />
                    </a>
                  </div>
                </div>
              </motion.div>

              <motion.div
                data-aos="zoom-out"
                className="517:p-6 220:p-3 rounded-2xl bg-gray-800/50 backdrop-blur-lg border border-white/10 relative overflow-hidden group "
                whileHover={{ scale: 1.02 }}
              >
                {/* Color blend animation */}
                <motion.div className="absolute inset-0 bg-gradient-to-r from-cyan-600/15 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex items-center gap-4 relative z-10">
                  <motion.div
                    className="p-3 rounded-full bg-blue-500/10 backdrop-blur-lg"
                    whileHover={{ rotate: 15, scale: 1.1 }}
                  >
                    <MapPinIcon className="h-6 w-6 text-blue-600" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold mb-1 text-white">
                      Location
                    </h3>

                    <a
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2"
                    >
                      Khan Chbar Ampov, Phnom Penh, Cambodia.
                      <ArrowTopRightOnSquareIcon className="517:h-6 517:w-6 220:h-5 220:w-5 text-blue-400 absolute 517:-top-3 220:-top-1 220:-right-0 517:-right-1 -translate-x-2 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all" />
                    </a>
                  </div>
                </div>
              </motion.div>
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
            {/* Success Message */}
            {success && (
              <motion.div
                className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-400 group"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex gap-2 items-center">
                  <VscCheckAll className="text-blue-400 text-xl" />
                  Message sent successfully!
                </div>
              </motion.div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
