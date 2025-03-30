import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@supabase/supabase-js";
import {
  FaComments,
  FaUserCircle,
  FaClock,
  FaCheckCircle,
  FaTimes,
} from "react-icons/fa";
import { MdCloudUpload } from "react-icons/md";

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error(
    "Missing Supabase credentials. Please check your environment variables."
  );
}

const supabase = createClient(supabaseUrl, supabaseKey);

const formatTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 2592000)
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  return date.toLocaleDateString();
};

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

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({
    name: "",
    comment: "",
    profile_image: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [, setTimeUpdate] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    fetchComments();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeUpdate((prev) => prev + 1);
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching comments:", error);
      return;
    }

    setComments(data || []);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("profile-images")
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("profile-images").getPublicUrl(filePath);

    return publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let profileImageUrl = null;
      if (selectedFile) {
        profileImageUrl = await uploadImage(selectedFile);
      }

      const { data, error } = await supabase
        .from("comments")
        .insert([
          {
            name: newComment.name,
            comment: newComment.comment,
            profile_image: profileImageUrl,
          },
        ])
        .select();

      if (error) throw error;

      setComments([data[0], ...comments]);
      setNewComment({ name: "", comment: "", profile_image: null });
      setSelectedFile(null);
      setPreviewUrl(null);
      setShowSuccess(true);
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-20 px-4 mx-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          type: "spring",
          damping: 25,
          stiffness: 100,
        }}
        className="space-y-4 sm:space-y-6 p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-lg border-2 border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-300"
      >
        <motion.div
          className="flex items-center justify-center gap-2 mb-4 sm:mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <FaComments className="text-2xl sm:text-3xl text-blue-500" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Comments
          </h2>
        </motion.div>

        {/* Comment Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="mb-4 sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="space-y-3 sm:space-y-4">
            <div>
              <input
                type="text"
                placeholder="Your Name"
                value={newComment.name}
                onChange={(e) =>
                  setNewComment({ ...newComment, name: e.target.value })
                }
                className="w-full px-3 sm:px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                required
              />
            </div>
            <div>
              <textarea
                placeholder="Your Comment"
                value={newComment.comment}
                onChange={(e) =>
                  setNewComment({ ...newComment, comment: e.target.value })
                }
                className="w-full px-3 sm:px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px] sm:min-h-[100px] text-sm sm:text-base"
                required
              />
            </div>
            <div className="relative">
              <label className="block text-xs sm:text-sm font-medium text-white mb-1 sm:mb-2">
                Profile Image (optional)
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="profile-image-input"
                />
                <label
                  htmlFor="profile-image-input"
                  className="flex items-center justify-center w-full h-24 sm:h-32 border-2 border-dashed border-white/20 rounded-lg cursor-pointer hover:border-blue-500 transition-colors duration-200"
                >
                  {previewUrl ? (
                    <div className="w-full h-full">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-white/60 text-xs sm:text-sm">
                      <MdCloudUpload className="text-3xl sm:text-4xl mb-1 sm:mb-2" />
                      <span>Click to upload profile image</span>
                      <span className="text-xs">or drag and drop</span>
                    </div>
                  )}
                </label>
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              {isSubmitting ? "Posting..." : "Post Comment"}
            </button>
          </div>
        </motion.form>

        {/* Comments List */}
        <motion.div
          className="space-y-4 sm:space-y-6 max-h-[400px] sm:max-h-[600px] overflow-y-auto pr-2 sm:pr-4 custom-scrollbar"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {comments.map((comment, index) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: "spring",
                damping: 20,
                stiffness: 200,
              }}
              className="bg-white/5 rounded-lg p-3 sm:p-6 hover:bg-white/10 transition-all duration-300 relative overflow-hidden group cursor-pointer"
            >
              {/* Hover effect overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
                whileHover={{
                  opacity: 1,
                  transition: { duration: 0.2 },
                }}
              />

              <div className="flex items-start space-x-3 sm:space-x-6 relative">
                <motion.div
                  className="flex-shrink-0"
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                    transition: {
                      type: "spring",
                      damping: 15,
                      stiffness: 200,
                    },
                  }}
                >
                  {comment.profile_image ? (
                    <img
                      src={comment.profile_image}
                      alt={comment.name}
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-blue-500 shadow-lg"
                    />
                  ) : (
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl sm:text-2xl font-bold border-2 border-blue-500 shadow-lg">
                      {comment.name.charAt(0)}
                    </div>
                  )}
                </motion.div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-0">
                    <motion.h3
                      className="text-lg sm:text-xl font-bold text-white truncate"
                      whileHover={{
                        x: 5,
                        color: "#60A5FA",
                        transition: { duration: 0.2 },
                      }}
                    >
                      {comment.name}
                    </motion.h3>
                    <motion.div
                      className="flex items-center text-white/50 text-xs sm:text-sm"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <FaClock className="mr-1" />
                      {formatTimeAgo(comment.created_at)}
                    </motion.div>
                  </div>
                  <motion.p
                    className="text-white/80 mt-1 sm:mt-2 text-sm sm:text-lg break-words"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{
                      color: "#E5E7EB",
                      transition: { duration: 0.2 },
                    }}
                  >
                    {comment.comment}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <AnimatePresence mode="wait">
        {showSuccess && (
          <SuccessAlert
            message="Comment posted successfully!"
            onClose={() => setShowSuccess(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Comments;
