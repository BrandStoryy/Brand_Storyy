import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';

const CTASection = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const features = [
    { icon: CheckCircle, text: "Free 14-day trial" },
    { icon: CheckCircle, text: "No credit card required" },
    { icon: CheckCircle, text: "Cancel anytime" }
  ];

  return (
    <motion.section 
      className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="bg-gradient-to-br from-purple-600 via-purple-700 to-blue-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-center text-white relative overflow-hidden"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
        >
          {/* Decorative Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"
              animate={{
                x: [0, 20, 0],
                y: [0, -10, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/10 rounded-full blur-xl"
              animate={{
                x: [0, -15, 0],
                y: [0, 15, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          <div className="relative z-10">
            {/* Heading */}
            <motion.h2 
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight"
              variants={itemVariants}
            >
              Ready to Let AI Do the Heavy Lifting?
            </motion.h2>

            {/* Description */}
            <motion.p 
              className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 text-purple-100 leading-relaxed px-2"
              variants={itemVariants}
            >
              Join thousands of businesses that have transformed their marketing with BrandStoryy's AI agents. 
              Start your free trial today and experience the future of marketing automation.
            </motion.p>

            {/* Mobile-First Form Layout */}
            <motion.div 
              className="space-y-4 mb-6 sm:mb-8"
              variants={itemVariants}
            >
              {/* Email Input - Full width on mobile */}
              <div className="w-full max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl text-gray-800 text-base sm:text-lg placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all shadow-lg"
                />
              </div>

              {/* CTA Button - Full width on mobile */}
              <motion.button 
                className="w-full max-w-md mx-auto bg-white text-purple-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:shadow-2xl transition-all flex items-center justify-center space-x-2 shadow-lg"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                variants={itemVariants}
              >
                <span>Start Your BrandStoryy Today</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>

            {/* Features - Mobile Stack, Desktop Horizontal */}
            <motion.div 
              className="flex flex-col sm:flex-row sm:flex-wrap justify-center items-center gap-4 sm:gap-6 lg:gap-8 text-sm sm:text-base text-purple-100"
              variants={itemVariants}
            >
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
                  transition={{ duration: 0.2 }}
                >
                  <feature.icon className="w-4 h-4 flex-shrink-0" />
                  <span className="whitespace-nowrap">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Desktop Alternative Layout (Hidden on Mobile) */}
            <div className="hidden lg:block mt-8">
              <motion.div 
                className="flex items-center justify-center space-x-4 max-w-2xl mx-auto"
                variants={itemVariants}
              >
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="flex-1 px-6 py-4 rounded-xl text-gray-800 text-lg placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all shadow-lg"
                />
                <motion.button 
                  className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all flex items-center space-x-2 shadow-lg whitespace-nowrap"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CTASection;