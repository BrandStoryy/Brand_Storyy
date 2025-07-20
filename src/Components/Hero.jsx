import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Play, ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Zap className="w-4 h-4" />
            <span>Next-Gen Marketing Automation</span>
          </motion.div>
          
      <motion.h1 
  className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent leading-none pb-4"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.4 }}
>
  Let AI Agents Handle Your Marketing
</motion.h1>

          
          <motion.p 
            className="text-xl text-gray-600 max-w-4xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Enter your business details once. Our intelligent AI agents work 24/7 to create content, 
            run campaigns, and grow your brand across every channel.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <motion.button 
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg font-medium text-lg hover:shadow-xl transition-all flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Start Your BrandStoryy Today</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            
            <motion.button 
              className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <Play className="w-5 h-5" />
              <span>Watch Demo</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;