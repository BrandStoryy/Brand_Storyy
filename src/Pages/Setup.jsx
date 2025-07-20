import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const cards = [
  {
    id: "business",
    title: "Business Info",
    description: "Company name, industry, and core services",
    examples: ["Tech Startup", "E-commerce", "Local Restaurant"],
    inputs: ["Company Name", "Industry", "Core Services", "Website", "Email"],
    icon: "🏢",
    gradient: "linear-gradient(135deg, #8422c5, #b91865)",
  },
  {
    id: "audience",
    title: "Target Audience",
    description: "Demographics, interests, and pain points",
    examples: [
      "Young Professionals",
      "Small Business Owners",
      "Health Enthusiasts",
    ],
    inputs: ["Age Group", "Interests", "Pain Points", "Profession", "Location"],
    icon: "🎯",
    gradient: "linear-gradient(135deg, #b91865, #9f1d94)",
  },
  {
    id: "voice",
    title: "Brand Voice",
    description: "Tone, personality, and communication style",
    examples: [
      "Professional & Trustworthy",
      "Fun & Casual",
      "Expert & Authoritative",
    ],
    inputs: ["Tone", "Personality", "Language Style", "Examples", "Keywords"],
    icon: "🗣️",
    gradient: "linear-gradient(135deg, #9f1d94, #8422c5)",
  },
  {
    id: "location",
    title: "Location & Market",
    description: "Geographic focus and market positioning",
    examples: ["San Francisco Bay Area", "Global Online", "Local Community"],
    inputs: [
      "Country",
      "City",
      "Market Type",
      "Competition",
      "Customer Region",
    ],
    icon: "📍",
    gradient: "linear-gradient(135deg, #8422c5, #9f1d94)",
  },
  {
    id: "goals",
    title: "Goals & Objectives",
    description: "Primary marketing goals and KPIs",
    examples: ["Lead Generation", "Brand Awareness", "Customer Retention"],
    inputs: ["Main Goal", "KPI", "Target Audience", "Timeline", "Budget"],
    icon: "🎯",
    gradient: "linear-gradient(135deg, #b91865, #8422c5)",
  },
  {
    id: "channels",
    title: "Platforms & Channels",
    description: "Preferred marketing channels and platforms",
    examples: [
      "Instagram + LinkedIn",
      "Email + Google Ads",
      "TikTok + Facebook",
    ],
    inputs: [
      "Primary Platform",
      "Secondary Platform",
      "Ad Budget",
      "Frequency",
      "Audience",
    ],
    icon: "📱",
    gradient: "linear-gradient(135deg, #9f1d94, #b91865)",
  },
];

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

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const floatingAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

export default function SetupPage() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-pink-50 p-4 sm:p-6 lg:p-8 overflow-hidden relative mt-0">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(132, 34, 197, 0.15), rgba(185, 24, 101, 0.1))",
            filter: "blur(60px)",
          }}
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 opacity-25"
          style={{
            background:
              "radial-gradient(circle, rgba(159, 29, 148, 0.15), rgba(132, 34, 197, 0.1))",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            type: "spring",
            stiffness: 100,
          }}
          className="text-center mb-12 lg:mb-16"
        >
          <motion.h1
            animate={floatingAnimation}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
            style={{
              background: "linear-gradient(135deg, purple 0%, blue 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            One-Time Setup, Lifetime Value
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="relative"
          >
            <p className="text-lg sm:text-xl max-w-3xl mx-auto text-gray-600 leading-relaxed">
              Tell us about your business once, and our AI agents will use this
              knowledge base to create perfectly tailored content across all
              your marketing channels.
            </p>
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -inset-4 rounded-2xl blur-xl -z-10"
              style={{
                background:
                  "linear-gradient(135deg, rgba(132, 34, 197, 0.1), rgba(185, 24, 101, 0.1))",
              }}
            />
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 lg:gap-8"
        >
          {cards.map((card, i) => (
            <motion.div
              key={card.id}
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                z: 50,
              }}
              whileTap={{ scale: 0.98 }}
              onHoverStart={() => setHoveredCard(card.id)}
              onHoverEnd={() => setHoveredCard(null)}
              onClick={() => setSelectedCard(card)}
              className="group cursor-pointer relative"
            >
              {/* Glowing border effect */}
              <motion.div
                animate={
                  hoveredCard === card.id
                    ? {
                        scale: [1, 1.02, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }
                    : {}
                }
                transition={{
                  duration: 1.5,
                  repeat: hoveredCard === card.id ? Infinity : 0,
                  ease: "easeInOut",
                }}
                className="absolute -inset-0.5 rounded-2xl blur-sm opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                style={{
                  background: card.gradient,
                }}
              />

              {/* Card content */}
              <div
                className="relative bg-white/70 backdrop-blur-xl border border-white/60 rounded-2xl p-6 lg:p-8 h-full transition-all duration-500 group-hover:bg-white/80 group-hover:border-white/80 group-hover:shadow-2xl"
                style={{
                  boxShadow:
                    hoveredCard === card.id
                      ? "0 25px 50px -12px rgba(132, 34, 197, 0.25)"
                      : "0 10px 25px -3px rgba(0, 0, 0, 0.1)",
                }}
              >
                {/* Icon with floating animation */}
                <motion.div
                  animate={
                    hoveredCard === card.id
                      ? {
                          rotate: [0, -10, 10, 0],
                          scale: [1, 1.1, 1],
                        }
                      : {}
                  }
                  transition={{
                    duration: 0.6,
                    ease: "easeInOut",
                  }}
                  className="text-4xl lg:text-5xl mb-4 block"
                >
                  {card.icon}
                </motion.div>

                <motion.h3
                  className="text-xl lg:text-2xl font-bold mb-3 text-gray-800 group-hover:text-transparent transition-colors duration-300"
                  style={
                    hoveredCard === card.id
                      ? {
                          background: card.gradient,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }
                      : {}
                  }
                >
                  {card.title}
                </motion.h3>

                <p className="text-gray-600 mb-4 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {card.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {card.examples.map((ex, idx) => (
                    <motion.span
                      key={ex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * idx }}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1.5 bg-white/60 backdrop-blur-sm text-gray-700 text-sm rounded-full border border-white/80 hover:bg-white/80 hover:border-purple-200 transition-all duration-300"
                      style={{
                        boxShadow: "0 2px 8px rgba(132, 34, 197, 0.1)",
                      }}
                    >
                      {ex}
                    </motion.span>
                  ))}
                </div>

                {/* Hover indicator */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={
                    hoveredCard === card.id
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0, x: -20 }
                  }
                  className="absolute top-4 right-4 text-purple-500"
                >
                  ✨
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Enhanced Modal */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-2xl"
            style={{
              background: "rgba(255, 255, 255, 0.3)",
            }}
            onClick={() => setSelectedCard(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateX: -30 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotateX: 30 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              className="bg-white/80 backdrop-blur-2xl border border-white/60 rounded-3xl shadow-2xl w-full max-w-lg p-4 relative overflow-hidden"
              style={{
                boxShadow: "0 25px 50px -12px rgba(132, 34, 197, 0.3)",
                maxHeight: "85vh",
                overflowY: "auto",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Animated background gradient */}
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -inset-32 opacity-10 rounded-full blur-3xl"
                style={{
                  background: selectedCard.gradient,
                }}
              />

              <div className="relative z-10">
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-center mb-4"
                >
                  <div className="text-4xl mb-2">{selectedCard.icon}</div>
                  <h2
                    className="text-2xl font-bold mb-1 text-gray-800"
                    style={{
                      background: selectedCard.gradient,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {selectedCard.title}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Complete the form below to continue
                  </p>
                </motion.div>

                <motion.form
                  className="space-y-3"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {selectedCard.inputs.map((label, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="relative"
                    >
                      <input
                        type="text"
                        placeholder={label}
                        className="w-full px-4 py-2 rounded-xl bg-white/60 backdrop-blur-sm border border-white/80 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:bg-white/80 transition-all duration-300"
                        onFocus={(e) => {
                          e.target.style.boxShadow =
                            "0 0 0 2px rgba(132, 34, 197, 0.3)";
                        }}
                        onBlur={(e) => {
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </motion.div>
                  ))}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="w-full text-white py-2 rounded-xl font-semibold text-base shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                    style={{
                      background: selectedCard.gradient,
                      boxShadow: "0 10px 25px -5px rgba(132, 34, 197, 0.4)",
                    }}
                  >
                    <motion.div
                      animate={{
                        x: [-100, 100],
                        opacity: [0, 0.3, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 2,
                      }}
                      className="absolute inset-0 bg-white/20 skew-x-12"
                    />
                    Submit Information
                  </motion.button>
                </motion.form>

                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedCard(null)}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 bg-white/60 hover:bg-white/80 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/60"
                >
                  ✕
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
