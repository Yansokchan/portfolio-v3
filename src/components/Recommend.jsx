import { div } from "framer-motion/client";
import Stepper, { Step } from "./Animations/Stepper";
import { useState } from "react";
const Recommend = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    recommendation: "",
  });

  const [errors, setErrors] = useState({});

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 2) {
      if (!formData.name.trim()) newErrors.name = "Name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email))
        newErrors.email = "Invalid email address";
    }

    if (step === 3) {
      if (!formData.recommendation.trim())
        newErrors.recommendation = "Recommendation is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmitRecom = async (e) => {
    const formPayload = new FormData();
    formPayload.append("access_key", "68a4d70f-7e45-422f-bf56-42afeed37f1c");
    formPayload.append("name", formData.name);
    formPayload.append("email", formData.email);
    formPayload.append("recommendation", formData.recommendation);
    formPayload.append("subject", "New Recommendation Submission");
    formPayload.append("botcheck", "");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formPayload,
      });
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };
  return (
    <div className="flex flex-col my-20 max-h-full mx-5">
      <h1
        data-aos="fade-up"
        className="text-cyan-400 text-3xl md:text-4xl font-bold mb-5 text-center"
      >
        Recommendation
      </h1>
      <p
        data-aos="fade-up"
        className="text-gray-400 text-xl md:text-2xl mb-10 text-center"
      >
        Please share any tips or advice for making my journey better.
      </p>
      <Stepper
        data-aos="zoom-in"
        initialStep={1}
        onFinalStepCompleted={handleSubmitRecom}
        nextButtonProps={{ type: "submit" }}
        validateStep={validateStep} // Pass validation function
      >
        {/* Step 1: Welcome */}
        <Step>
          <div className="text-center space-y-4">
            <h1 className="220:text-2xl 440:text-3xl font-bold text-cyan-400">
              Welcome! 👋
            </h1>
            <p className="text-gray-400 text-[18px]">
              I am excited to hear your thoughts. This will only take a moment.
            </p>
          </div>
        </Step>

        {/* Step 2: Name & Email */}
        <Step>
          <form className="">
            <div>
              <label className="block text-sm font-medium text-cyan-400">
                Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                required
                className={`mt-1 block w-full rounded-mdw-full text-white px-4 py-3 bg-gray-800/50 backdrop-blur-lg border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.name ? "border-red-500" : ""
                }`}
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              {errors.name ? (
                <p className="text-sm text-red-500 mt-1">{errors.name}</p>
              ) : (
                <p className="text-sm opacity-0 text-red-500 mt-1">Ho</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-cyan-400">
                Email
              </label>
              <input
                type="email"
                required
                placeholder="Your email"
                className={`mt-1 block w-full rounded-md text-white px-4 py-3 bg-gray-800/50 backdrop-blur-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.email ? "border-red-500" : ""
                }`}
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              {errors.email ? (
                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
              ) : (
                <p className="text-sm opacity-0 text-red-500 mt-1">Ho</p>
              )}
            </div>
          </form>
        </Step>

        {/* Step 3: Recommendation */}
        <Step>
          <div>
            <label className="block text-[18px] mb-3 font-medium text-cyan-400">
              Your recommendation is valueable to me.
            </label>
            <textarea
              rows={4}
              required
              placeholder="Your opinions..."
              className={`mt-1 block w-full rounded-md text-white px-4 py-3 bg-gray-800/50 backdrop-blur-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                errors.recommendation ? "border-red-500" : ""
              }`}
              value={formData.recommendation}
              onChange={(e) =>
                setFormData({ ...formData, recommendation: e.target.value })
              }
            />
            {errors.recommendation ? (
              <p className="text-sm text-red-500 mt-1">
                {errors.recommendation}
              </p>
            ) : (
              <p className="text-sm opacity-0 text-red-500 mt-1">hi</p>
            )}
          </div>
        </Step>

        {/* Step 4: Thank You */}
        <Step>
          <div className="text-center space-y-4">
            <h1 className="text-3xl text-cyan-400 font-bold">
              Many thanks for taking the time! 🎉
            </h1>
            <p className="text-gray-400 text-[18px]">
              I truly value your feedback and will use your ideas to develop
              myself further.
            </p>
          </div>
        </Step>
      </Stepper>
    </div>
  );
};

export default Recommend;
