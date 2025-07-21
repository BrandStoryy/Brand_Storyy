import React from 'react';
import { motion } from 'framer-motion';
import { Users, Zap, Target } from 'lucide-react';

const StatsBar = () => {
  const stats = [
    {
      icon: Users,
      text: "10,000+ businesses trust us",
      color: "text-emerald-500",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200"
    },
    {
      icon: Zap,
      text: "5x faster content creation",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      icon: Target,
      text: "24/7 automated workflows",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.2,
      rotate: 10,
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };

  return (
    <motion.div 
      className="bg-gradient-to-r from-white/80 via-white/60 to-white/80 backdrop-blur-xl border-b border-purple-100 py-6 md:py-4 shadow-sm"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Layout */}
        <div className="hidden md:flex justify-center items-center space-x-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover="hover"
              initial="rest"
              className="flex items-center space-x-3 group cursor-default"
            >
              <motion.div
                variants={iconVariants}
                className={`w-10 h-10 ${stat.bgColor} ${stat.borderColor} border rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-300`}
              >
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </motion.div>
              <span className="text-gray-700 font-medium text-sm group-hover:text-gray-900 transition-colors duration-300">
                {stat.text}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Mobile Layout - Stacked */}
        <div className="md:hidden space-y-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover="hover"
              initial="rest"
              className={`flex items-center justify-center space-x-4 p-4 ${stat.bgColor} border ${stat.borderColor} rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group`}
            >
              <motion.div
                variants={iconVariants}
                className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-sm"
              >
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </motion.div>
              <span className="text-gray-800 font-semibold text-base flex-1 text-center">
                {stat.text}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Tablet Layout - 2x2 Grid */}
        <div className="hidden sm:grid md:hidden grid-cols-1 gap-4 max-w-md mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover="hover"
              initial="rest"
              className={`flex items-center space-x-4 p-4 ${stat.bgColor} border ${stat.borderColor} rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group`}
            >
              <motion.div
                variants={iconVariants}
                className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-sm"
              >
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </motion.div>
              <span className="text-gray-800 font-semibold text-sm">
                {stat.text}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-purple-200/30 to-blue-200/30 rounded-full blur-xl"
            animate={{
              x: [0, 10, 0],
              y: [0, -5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-br from-emerald-200/30 to-purple-200/30 rounded-full blur-xl"
            animate={{
              x: [0, -8, 0],
              y: [0, 8, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default StatsBar;