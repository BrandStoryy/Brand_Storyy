// FeatureCards.jsx
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Zap,
  Target,
  Sparkles,
  Bot,
  BrainCircuit,
  Lightbulb,
  CheckCircle,
} from "lucide-react";

const icons = [
  <Bot className="w-5 h-5 text-purple-500" />,
  <BrainCircuit className="w-5 h-5 text-indigo-500" />,
  <Lightbulb className="w-5 h-5 text-blue-500" />,
  <Sparkles className="w-5 h-5 text-pink-500" />,
  <CheckCircle className="w-5 h-5 text-green-500" />,
];

const cards = [
  {
    id: 1,
    title: "Setup Once",
    description:
      "Tell us about your business - name, niche, tone, audience, services.",
    icon: <Users className="text-blue-600 w-16 h-16" />,
    steps: [
      "Enter business name",
      "Select your niche",
      "Choose tone of voice",
      "Define audience",
      "Add services",
    ],
    link: "/setup",
  },
  {
    id: 2,
    title: "AI Agents Work",
    description:
      "Our AI agents use your info to create content for social media, ads, etc.",
    icon: <Zap className="text-blue-600 w-16 h-16" />,
    steps: [
      "Analyze inputs",
      "Generate marketing content",
      "Personalize per platform",
      "Use best practices",
      "Optimize outputs",
    ],
    link: "/agents",
  },
  {
    id: 3,
    title: "Deploy & Scale",
    description: "Review, edit, and deploy content from the platform.",
    icon: <Target className="text-blue-600 w-16 h-16" />,
    steps: [
      "Preview content",
      "Make edits if needed",
      "Click deploy",
      "Track performance",
      "Scale to other channels",
    ],
    link: "/deploy",
  },
];

const FlipCard = ({ card }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full sm:w-[280px] md:w-[300px] lg:w-[320px] h-[420px] sm:h-[440px] perspective group">
      <div className="flip-container w-full h-full">
        {/* Front Side */}
        <div className="front bg-white shadow-lg rounded-xl p-6 flex flex-col items-center justify-center text-center h-full">
          <div className="mb-4">{card.icon}</div>
          <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
          <p className="text-sm text-gray-600">{card.description}</p>
        </div>

        {/* Back Side */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="back bg-white/90 backdrop-blur-lg border border-gray-200 rounded-xl shadow-xl p-4 sm:p-6 flex flex-col text-gray-800 relative h-full"
        >
          <Sparkles className="absolute top-3 right-3 sm:top-4 sm:right-4 text-purple-500 animate-pulse w-4 h-4 sm:w-5 sm:h-5" />

          <h3 className="text-lg sm:text-xl font-semibold text-purple-700 mb-4 sm:mb-6 text-center pr-8">
            Step-by-Step AI Flow
          </h3>

          {/* Scrollable content area */}
          <div className="flex-1 overflow-y-auto min-h-0 mb-4">
            <ul className="space-y-3 sm:space-y-4">
              {card.steps.map((step, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center justify-between bg-white rounded-md shadow-sm px-2 sm:px-3 py-2 hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center bg-purple-600 text-white text-xs font-bold rounded-full shadow flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-gray-700 truncate">
                      {step}
                    </span>
                  </div>
                  <div className="text-sm sm:text-lg flex-shrink-0 ml-2">
                    {icons[index % icons.length]}
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Fixed CTA Button at bottom */}
          <div className="flex-shrink-0 pt-2">
            <button
              onClick={() => navigate(card.link)}
              className="w-full px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:scale-105 transition-transform duration-200 shadow-md"
            >
              Explore This
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const FeatureCards = () => {
  return (
    <section className="py-12 sm:py-20 pb-20 sm:pb-32 bg-[#f7faff]">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-xs sm:text-sm text-blue-600 font-semibold mb-2 uppercase">
          How It Works
        </p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
          One Setup. Multiple AI Agents. Infinite Possibilities.
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto mb-8 sm:mb-10 px-4">
          Enter your business details once, and watch our AI agents create
          tailored marketing content across every platform.
        </p>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {cards.map((card) => (
            <FlipCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;