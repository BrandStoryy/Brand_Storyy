import React from 'react';
import { motion } from 'framer-motion';
import { Users, Zap, Target } from 'lucide-react';

const StatsBar = () => {
  return (
    <motion.div 
      className="bg-white/60 backdrop-blur-sm border-b border-purple-100 py-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center items-center space-x-8 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-green-500" />
            <span>10,000+ businesses trust us</span>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-blue-500" />
            <span>5x faster content creation</span>
          </div>
          <div className="flex items-center space-x-2">
            <Target className="w-4 h-4 text-purple-500" />
            <span>24/7 automated workflows</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StatsBar;